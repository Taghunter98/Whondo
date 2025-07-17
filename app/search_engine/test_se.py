import unittest
from tokenisation import Token, Tokens, Parser

class TestSearchEngine(unittest.TestCase):
    def testTokenLib(self):
        t1: Token = Token("Token One")
        t2: Token = Token("Token Two")

        tokens = Tokens()
        tokens.push(t1)
        tokens.push(t2)

        self.assertEqual(type(t1), Token)
        self.assertEqual(tokens.get(0).name, "Token One")
        self.assertEqual(tokens.length(), 2, f"Returning {tokens.tokens.__len__}")

    def testParser(self):
        prompt: str = "I want to live in Canterbury in a flat that is £1000 a month"

        parser: Parser = Parser(prompt)
        tokens: list[Token] = parser.tokenise()
        names = [t.name for t in tokens]

        self.assertEqual(names, ["canterbury", "flat", "£1000", "month"], f"Returning: {names}")
        self.assertTrue(parser.isTown("canterbury"), f"Returning {parser.isTown("canterbury")}")
        self.assertTrue(tokens[0].is_city)
        self.assertTrue(tokens[2].is_number)