"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    tokenisation.py
Author:      Josh Bassett
Date:        17/07/2025
Version:     1.0

Description: Provides a library for tokenisation.
"""

import re
from rapidfuzz import process, fuzz

from dictionaries import SIFT_LIST, TOWNS, KEYWORDS, SYNONYMS


class Token:
    def __init__(self, name: str):
        self.name: str = name
        self.position: int = 0
        self.context: float = 0
        self.is_number: bool = False
        self.is_city: bool = False
        self.is_price: bool = False
        self.next: Token = None
        self.prev: Token = None

    def printToken(self):
        print(
            f"Name: {self.name:<10}  "
            f"Pos: {self.position:<3}  "
            f"Con: {self.context:<6.2f}  "
            f"Num: {str(self.is_number):<5}  "
            f"City: {str(self.is_city):<5}"
        )


class Parser:
    def __init__(self, prompt: str):
        self.prompt: str = prompt.lower()

    def isTown(self, w: str) -> bool:
        return w in TOWNS

    def isNumber(self, token: Token, w: str) -> bool:
        cleaned = re.sub(r"£", "", w).strip()
        cleaned = cleaned.replace(",", "")

        if cleaned.isdigit():
            token.is_number = True
            token.name = cleaned
            return True
        return False

    def tokenise(self) -> list[Token]:
        tokens: list[Token] = []

        words = [w for w in self.prompt.split() if w not in SIFT_LIST or w in TOWNS]

        for pos, w in enumerate(words):
            t = Token(w)
            t.position = pos
            t.is_city = self.isTown(w)
            t.is_number = self.isNumber(t, w)

            if tokens:
                prev = tokens[-1]
                t.prev = prev
                prev.next = t

            tokens.append(t)

        return tokens

    def canonical_field(self, token_name: str) -> str | None:
        name = token_name.lower().strip()

        if name in KEYWORDS:
            return name

        if name in SYNONYMS:
            return SYNONYMS[name]

        match, score, _ = process.extractOne(
            name, KEYWORDS, scorer=fuzz.partial_ratio, score_cutoff=80
        ) or (None, 0, None)
        return match

    def contextParser(self, tokens: list[Token]) -> tuple[list[Token], list]:
        location = None
        price = None

        seen_fields = set()
        context = []

        for t in tokens:
            next = t.next.name if t.next else None
            prev = t.prev.is_city if t.prev else False

            if t.is_number:
                # Only treat this as a price if next is a time unit or prev was a city
                if next in ("month", "week") or prev:
                    t.is_price = True
                    price = float(t.name)
                    continue
                else:
                    continue

            if t.is_city:
                location = t.name
                continue

            field = self.canonical_field(t.name)
            if field and field not in seen_fields:
                seen_fields.add(field)
                t.name = field
                context.append(t)

        return context, [location, price]
