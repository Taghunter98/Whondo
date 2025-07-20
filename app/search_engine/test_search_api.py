import unittest
import requests

from tokenisation import Parser  # temp


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
            Parser.phraseToNum(self, "two thousand")
            + Parser.phraseToNum(self, "three hundred"),
            2300,
        )
        self.assertEqual(Parser.phraseToNum(self, "twenty flat"), None)

    def testCurrenyFormattingWords(self):
        prompt: str = "I need a flat in London for up to two thousand a month."

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "london")
        self.assertEqual(price, 2000)
        self.assertEqual(names, ["flat"], f"Returning: {context}")
