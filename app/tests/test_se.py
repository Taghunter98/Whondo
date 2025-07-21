import unittest
from app.search_engine.tokenisation import Token, Parser


class TestSearchEngine(unittest.TestCase):
    @classmethod
    def runPrompt(self, prompt: str):
        parser: Parser = Parser(prompt)
        tokens: list[Token] = parser.tokenise()
        # print(f"TOKEN GEN: {' '.join([t.name for t in tokens])}")
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
        self.assertEqual(Parser.phraseToNum(self, "six thousand two hundred five"), 6205)
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


    def testPromptOne(self):
        prompt: str = "I want to rent a flat in Canterbury that's £2000 a month, allows a pet and near the university of Kent 2 bedrooms and 1 bathroom"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "canterbury")
        self.assertEqual(price, 2000)
        self.assertEqual(bedrooms, 2)
        self.assertEqual(bathrooms, 1)
        self.assertEqual(
            names, ["flat", "pets_allowed", "near_university"], f"Returning: {context}"
        )

    def testPromptTwo(self):
        prompt = "Looking for a furnished house in Manchester, £1500 per week, with en suite and bike storage, near the station"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "manchester")
        self.assertEqual(price, 1500)
        self.assertEqual(
            names,
            ["furnished", "house", "en_suite", "bike_storage", "close_to_station"],
        )

    def testPromptThree(self):
        prompt = "Need a zero deposit studio in Edinburgh for £850 a month, wheelchair accessible and lgbtq friendly"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "edinburgh")
        self.assertEqual(price, 850)
        self.assertEqual(
            names,
            ["no_deposit", "studio", "wheelchair_accessible", "lgbtq_friendly"],
        )

    def testPromptFour(self):
        prompt = "Show me a social house in Bristol with bills included and no guarantor, costing £1200 a month"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "bristol")
        self.assertEqual(price, 1200)
        self.assertEqual(
            names,
            ["social_house", "house", "bills_included", "no_guarantor"],
        )

    def testPromptFive(self):
        prompt = "I want a cycle friendly flat in London, long term let, £2200 per month, near the university"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "london")
        self.assertEqual(price, 2200)
        self.assertEqual(
            names,
            ["cycle_friendly", "flat", "long_let", "near_university"],
        )

    def testPromptSix(self):
        prompt = "Searching for a vegan household penthouse in York, short-term let, £3000 a month"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "york")
        self.assertEqual(price, 3000)
        self.assertEqual(
            names,
            ["vegan_household", "penthouse", "short_let"],
        )

    def testPromptSeven(self):
        prompt = "Need a parking balcony apartment in Nottingham, zone 3 access, bus route nearby, £700 per week"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "nottingham")
        self.assertEqual(price, 700)
        self.assertEqual(
            names,
            ["parking", "balcony", "flat", "zone_3", "bus_route"],
        )

    def testPromptEight(self):
        prompt = "A double room in Leeds, unfurnished, near bus route, £600 a month"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "leeds")
        self.assertEqual(price, 600)
        self.assertEqual(
            names,
            ["double_room", "unfurnished", "bus_route"],
        )
