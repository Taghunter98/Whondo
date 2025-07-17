import unittest
from tokenisation import Token, Tokens, Parser


class TestSearchEngine(unittest.TestCase):
    def setUp(self):
        prompt: str = "I want to live in Canterbury in a flat that is £1000 a month"

        parser: Parser = Parser(prompt)
        tokens: list[Token] = parser.tokenise()
        return tokens, parser

    def testTokenLib(self):
        t1: Token = Token("Token One")
        t2: Token = Token("Token Two")

        tokens = Tokens([t1, t2])
        tokens.push(t1)
        tokens.push(t2)

        self.assertEqual(type(t1), Token)
        self.assertEqual(tokens.get(0).name, "Token One")
        self.assertEqual(tokens.length(), 4, f"Returning {tokens.length()}")

    def testParser(self):
        tokens, parser = self.setUp()
        names = [t.name for t in tokens]

        self.assertEqual(
            names, ["canterbury", "flat", "£1000", "month"], f"Returning: {names}"
        )
        self.assertTrue(
            parser.isTown("canterbury"), f"Returning {parser.isTown('canterbury')}"
        )
        self.assertTrue(tokens[0].is_city)
        self.assertTrue(tokens[2].is_number)

    def testTokens(self):
        tokens, parser = self.setUp()

        t: Tokens = Tokens(tokens)

        t.traverse()
