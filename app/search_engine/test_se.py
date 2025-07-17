import unittest
from tokenisation import Token, Parser


class TestSearchEngine(unittest.TestCase):
    def setUp(self):
        prompt: str = "I want to live in Canterbury in a flat that is £1000 a month"

        parser: Parser = Parser(prompt)
        tokens: list[Token] = parser.tokenise()
        return tokens, parser

    def testParser(self):
        tokens, parser = self.setUp()
        names = [t.name for t in tokens]

        self.assertEqual(
            names, ["canterbury", "flat", "1000", "month"], f"Returning: {names}"
        )
        self.assertTrue(
            parser.isTown("canterbury"), f"Returning {parser.isTown('canterbury')}"
        )
        self.assertTrue(tokens[0].is_city)
        self.assertTrue(tokens[2].is_number)

    def testTokens(self):
        prompt: str = "I want to rent a flat in Canterbury that's £2000 a month, allows a pet and near the university of Kent"

        parser: Parser = Parser(prompt)
        tokens: list[Token] = parser.tokenise()

        context, [location, price] = parser.contextParser(tokens)

        for t in context:
            print(t.name)

        print(f"Location: {location} Price: {price}")
