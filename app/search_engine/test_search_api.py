import unittest
import requests

from tokenisation import Parser, Token


class TestSearchEngine(unittest.TestCase):
    @classmethod
    def runPrompt(self, prompt: str):
        parser = Parser(prompt)
        tokens = parser.tokenise()
        print(f"TOKEN GEN: {' '.join([t.name for t in tokens])}")
        context, [location, price, bedrooms, bathrooms] = parser.contextParser(tokens)

        return context, [location, price, bedrooms, bathrooms]

    def testCurrenyFormatting(self):
        prompt: str = "I need a flat in London for up to £1,250."

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "london")
        self.assertEqual(price, 1250)
        self.assertEqual(names, ["flat"], f"Returning: {context}")

    def testWordToNum(self):
        self.assertEqual(Parser.phraseToNum(self, "twenty"), 20)
        self.assertEqual(Parser.phraseToNum(self, "twenty five"), 25)
        self.assertEqual(Parser.phraseToNum(self, "fifteen"), 15)
        self.assertEqual(Parser.phraseToNum(self, "one hundred"), 100)
        self.assertEqual(Parser.phraseToNum(self, "two hundred"), 200)
        self.assertEqual(Parser.phraseToNum(self, "two thousand"), 2000)
        self.assertEqual(Parser.phraseToNum(self, "two thousand five hundred"), 2500)
        self.assertEqual(
            Parser.phraseToNum(self, "six thousand two hundred five"), 6205
        )
        self.assertEqual(Parser.phraseToNum(self, "twenty flat"), None)

    def testCurrenyFormattingWords(self):
        prompt: str = "I need a flat in London for up to two thousand a month."

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "london")
        self.assertEqual(price, 2000)
        self.assertEqual(names, ["flat"], f"Returning: {context}")

    def testDecimals(self):
        self.assertEqual(Parser.phraseToNum(self, "250.27"), 250.27)

        prompt: str = "I need a flat in Brighton for up to £1,250.50."

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "brighton")
        self.assertEqual(price, 1250.50)
        self.assertEqual(names, ["flat"], f"Returning: {context}")

    def testScore(self):
        keywords = ["flat", "furnished", "lgbtq_friendly", "near_university"]
        c1 = ["flat", "near_university", "near_station", "cycle_friendly"]
        c2 = ["flat", "near_university", "near_station", "furnished"]

        self.assertEqual(Parser.score(self, keywords, c1), 50)
        self.assertEqual(Parser.score(self, keywords, c2), 75)
        self.assertEqual(Parser.score(self, keywords, keywords), 100)
