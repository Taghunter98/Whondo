"""
Copyright (c) 2025 Josh Bassett, whondo.com

Filename:    tokenisation.py
Author:      Josh Bassett
Date:        17/07/2025
Version:     1.0

Description: Provides a library for tokenisation.
"""

import re


class Token:
    def __init__(self, name: str):
        self.name: str = name
        self.position: int = 0
        self.context: float = 0
        self.is_number: bool = False
        self.is_city: bool = False
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


class Tokens:
    def __init__(self, tokens: list[Token]):
        self.tokens = tokens

    def push(self, token: Token):
        self.tokens.append(token)

    def get(self, pos: int) -> Token:
        return self.tokens[pos]

    def update(self, pos: int):
        self.tokens[pos].position = pos

    def length(self) -> int:
        return self.tokens.__len__()

    def traverse(self):
        cur = self.tokens[0]
        while cur.next != None:
            cur.printToken()
            cur = cur.next


class Parser:
    def __init__(self, prompt: str):
        self.prompt: str = prompt.lower()
        self.SIFT_LIST = [
            # pronouns & helpers
            "i",
            "me",
            "my",
            "mine",
            "we",
            "us",
            "our",
            "ours",
            "you",
            "your",
            "yours",
            "he",
            "him",
            "his",
            "she",
            "her",
            "hers",
            "it",
            "its",
            "they",
            "them",
            "their",
            "theirs",
            # verbs & auxiliaries
            "am",
            "is",
            "are",
            "was",
            "were",
            "be",
            "being",
            "been",
            "have",
            "has",
            "had",
            "do",
            "does",
            "did",
            "will",
            "would",
            "shall",
            "should",
            "may",
            "might",
            "must",
            "can",
            "could",
            "want",
            "live",
            # articles & conjunctions
            "a",
            "an",
            "the",
            "and",
            "but",
            "or",
            "if",
            "then",
            "else",
            "when",
            "where",
            "while",
            "that",
            # prepositions & particles
            "in",
            "on",
            "at",
            "by",
            "for",
            "with",
            "about",
            "against",
            "between",
            "into",
            "through",
            "during",
            "before",
            "after",
            "above",
            "below",
            "to",
            "from",
            "up",
            "down",
            "out",
            "over",
            "under",
            "again",
            "further",
            "here",
            "there",
            "why",
            "how",
            # quantifiers & modifiers
            "all",
            "any",
            "both",
            "each",
            "few",
            "more",
            "most",
            "other",
            "some",
            "such",
            "only",
            "own",
            "same",
            "so",
            "than",
            "too",
            "very",
            "just",
            "also",
            "really",
            "actually",
            "basically",
        ]

        self.TOWNS = [
            # England Cities
            "bath",
            "birmingham",
            "bradford",
            "brighton & hove",
            "bristol",
            "cambridge",
            "canterbury",
            "carlisle",
            "chelmsford",
            "chester",
            "chichester",
            "colchester",
            "coventry",
            "derby",
            "doncaster",
            "durham",
            "ely",
            "exeter",
            "gloucester",
            "hereford",
            "kingston upon hull",
            "lancaster",
            "leeds",
            "leicester",
            "lichfield",
            "lincoln",
            "liverpool",
            "london",
            "manchester",
            "milton keynes",
            "newcastle upon tyne",
            "norwich",
            "nottingham",
            "oxford",
            "peterborough",
            "plymouth",
            "portsmouth",
            "preston",
            "ripon",
            "salford",
            "salisbury",
            "sheffield",
            "southampton",
            "southend-on-sea",
            "st albans",
            "stoke-on-trent",
            "sunderland",
            "truro",
            "wakefield",
            "wells",
            "westminster",
            "winchester",
            "wolverhampton",
            "worcester",
            "york",
            # Northern Ireland Cities
            "armagh",
            "bangor",
            "belfast",
            "lisburn",
            "londonderry",
            "newry",
            # Scotland Cities
            "aberdeen",
            "dundee",
            "dunfermline",
            "edinburgh",
            "glasgow",
            "inverness",
            "perth",
            "stirling",
            # Wales Cities
            "bangor",
            "cardiff",
            "newport",
            "st asaph",
            "st davids",
            "swansea",
            "wrexham",
            # English Towns
            "reading",
            "luton",
            "northampton",
            "slough",
            "swindon",
            "wigan",
            "stockport",
            "warrington",
            "bolton",
            "blackpool",
            "crawley",
            "basildon",
            "ashford",
            "tunbridge wells",
            "maidstone",
        ]

    def isTown(self, w: str) -> bool:
        return w in self.TOWNS

    def isNumber(self, w: str) -> bool:
        w = re.sub("\£", "", w)
        return w.isdigit()

    def tokenise(self) -> list[Token]:
        tokens: list[Token] = []

        words = [
            w for w in self.prompt.split() if w not in self.SIFT_LIST or w in self.TOWNS
        ]

        for pos, w in enumerate(words):
            t = Token(w)
            t.position = pos
            t.is_city = self.isTown(w)
            t.is_number = self.isNumber(w)

            if tokens:
                prev = tokens[-1]
                t.prev = prev
                prev.next = t

            tokens.append(t)

        return tokens
