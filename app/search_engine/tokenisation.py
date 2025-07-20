"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    tokenisation.py
Author:      Josh Bassett
Date:        17/07/2025
Version:     1.0

Description: Provides a library for tokenising prompts.
"""

import re
from typing import Optional
from rapidfuzz import process, fuzz

from .dictionaries import (
    SIFT_LIST,
    TOWNS,
    KEYWORDS,
    SYNONYMS,
    PROTECTD,
    ZONE_MAP,
    PRICE_PREDICTION,
    UNITS,
    TENS,
    SCALES
)


class Token:
    def __init__(self, name: str):
        self.name: str = name
        self.position: int = 0
        self.raw: str = name
        self.is_number: bool = False
        self.is_city: bool = False
        self.is_price: bool = False
        self.consumed: bool = False
        self.next: Token = None
        self.prev: Token = None

    def printToken(self):
        """
        Simple debug method for printing a Token object
        """

        nxt = self.next.name if self.next else "<NONE>"
        prev = self.prev.name if self.prev else "<NONE>"
        print(
            f"Name: {self.name:<6} Raw: {self.raw:<10} "
            f"Pos: {self.position:<2} Num: {self.is_number} "
            f"City: {self.is_city} Next: {nxt} "
            f"Prev: {prev}"
        )


class Parser:
    """
    Class for building a Parser object.

    Contains methods for parsing and converting a prompt into valid database fields.
    """

    def __init__(self, prompt: str):
        self.prompt: str = prompt.replace("-", " ").replace("_", " ").lower()

    def isTown(self, w: str) -> bool:
        """
        Method checks if word is a Town.

        Args:
            w (str): word

        Returns:
            bool: Town status
        """
        return w in TOWNS

    def phraseToNum(self, phrase: str) -> Optional[int]:
        """
        Method converts a string phrase to valid integer.

        "two thousand five hundred" -> 2500

        Args:
            word (str): Word e.g "twenty two"

        Returns:
            Optional[int]: Integer version e.g 22
        """
        words = re.split(r"[\s-]+", phrase.lower().strip())
        total = 0
        current = 0

        for w in words:
            if w in UNITS:
                current += UNITS[w]
            elif w in TENS:
                current += TENS[w]
            elif w in SCALES:
                scale = SCALES[w]
                # if no unit before "hundred", treat as 1 hundred
                current = (current or 1) * scale

                # for scales ≥ 1000, push into total and reset
                if scale >= 1000:
                    total += current
                    current = 0
            else:
                return None

        return total + current

    def calculateValue(self, token: Token):
        """
        Method calculates value of string based integer (one, two three...).

        The raw Token value is used to first caluclate the value then if the next value
        is a number, it is added to the previous, then the node is unlinked.

        There are additonal checks for integer based values and if it's price/rent.

        Args:
            token (Token): Current Token
        """
        raw = token.raw.strip()

        if raw.startswith("£"):
            token.is_price = True
            raw = raw[1:].strip()

        raw = raw.replace(",", "")

        # Handle parsing digit literal
        if re.fullmatch(r"\d+(?:\.\d+)?", raw):
            val = float(raw) if "." in raw else int(raw)
        else:
            # Build a sliding window phrase across this token and look-aheads:
            phrase: str = raw
            val: int = self.phraseToNum(phrase)

            next: Token = token.next
            while val is not None and next and not next.is_city and not next.consumed:
                
                phrase = f"{phrase} {next.raw}"
                candidate: int = self.phraseToNum(phrase)
                if candidate is None:
                    break
              
                val: int = candidate
                next.consumed = True
                next = next.next

        if val is None:
            return

        token.is_number = True
        token.name = str(val)

        next: Token = token.next
        while next and next.consumed:
            next = next.next
        
        if next and next.raw.lower() in PRICE_PREDICTION:
            token.is_price = True


    def isNumber(self, token: Token, w: str) -> bool:
        """
        Method checks if word is a number, or price given a leading £.

        Args:
            token (Token): Token object
            w (str): Word from prompt

        Returns:
            bool: Number status
        """

        cleaned: str = w.replace(",", "")
        is_price = re.search(r"^£", cleaned)

        if is_price:
            cleaned = cleaned.replace("£", "")
            token.is_price = True

        if cleaned.isdigit():
            token.is_number = True
            token.name = cleaned
            return True

        return False

    def extractTowns(self) -> list[str]:
        """
        Method extracts town names and replaces spaces with - for normalisation.

        Sorts by decending length, using regex to enforce word boundries avoiding
        matching other substrings.

        Subs the prompt city with underscores: stoke on trent -> stoke-on-trent
        This ensures that city won't be broken into tokens later.

        Returns:
            list[str]: City matches
        """
        matches = []
        for city in sorted(TOWNS, key=lambda c: -len(c)):
            if re.search(rf"\b{re.escape(city)}\b", self.prompt):
                matches.append(city)
                self.prompt = re.sub(
                    rf"\b{re.escape(city)}\b", city.replace(" ", "_"), self.prompt
                )
        return matches

    def tokenise(self) -> list[Token]:
        """
        Method tokenises the prompt and returns list of Tokens.

        The town or towns are first cleaned, then the prompt is walked through
        clearing unwanted chars (*/'#) etc.

        The tokens are created from remaining words not in the sift list.

        The token list is then returned.

        Returns:
            list[Token]: Token list
        """
        self.extractTowns()

        raw_words: list[str] = []
        for w in self.prompt.split():
            clean: str = re.sub(r"[^\w\s£]", "", w)  # Cleans unwanted chars
            if clean and clean not in SIFT_LIST:
                raw_words.append(clean)

        tokens: list[Token] = []
        for pos, w in enumerate(raw_words):
            t = Token(w)
            t.position = pos
            t.is_city = self.isTown(w)
            t.is_number = self.isNumber(t, w)

            if tokens:
                prev: Token = tokens[-1]
                t.prev = prev
                prev.next = t

            tokens.append(t)
        return tokens

    def mapField(self, token_name: str) -> Optional[str]:
        """
        Method maps Tokens to database fields.

        The name is checked against protected fields, existing database fields,
        synonyms for alternative spellings and finally a fuzzy filter to catch
        similar values.

        Args:
            token_name (str): Name of current Token

        Returns:
            str | None: Mapped field or None
        """
        name = token_name.lower().strip()

        if name in PROTECTD:
            return None

        if name in KEYWORDS:
            return name

        if name in SYNONYMS:
            return SYNONYMS[name]

        match, score, _ = process.extractOne(
            name, KEYWORDS, scorer=fuzz.ratio, score_cutoff=70
        ) or (None, 0, None)

        return match

    def contextParser(self, tokens: list[Token]) -> tuple[list[Token], list]:
        """
        Method evaluates context and converts the Tokens into databse fields.

        The location and price are found for query data and the tokens are run
        through checks to build context and find the closest fields.

        Args:
            tokens (list[Token]): Token list

        Returns:
            tuple[list[Token], list]: Tuple of Tokens, location and price
        """
        location: str = None
        price: float = None
        bedrooms: int = None
        bathrooms: int = None

        seen_fields: set = set()
        context: list[Token] = []

        for t in tokens:
            if t.consumed:
                continue

            self.calculateValue(t)

            next: str = t.next.name if t.next else None
            prev: str = t.prev.name if t.prev else False

            if t.is_number:
                # pricing detection
                if t.is_price:
                    price = float(t.name)
                    continue

            # zoning detection
            if t.name == "zone":
                zone_field: str = ZONE_MAP.get(t.next.name)
                if zone_field:
                    t.name = zone_field

            # city detection
            if t.is_city:
                location = t.name
                continue

            # database field token matching
            field = self.mapField(t.name)
            if field and field not in seen_fields:
                seen_fields.add(field)
                t.name = field
                context.append(t)

        return context, [location, price, bedrooms, bathrooms]
