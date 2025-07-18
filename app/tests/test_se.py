import unittest
from app.search_engine.tokenisation import Token, Parser


class TestSearchEngine(unittest.TestCase):
    @classmethod
    def runPrompt(self, prompt: str):
        parser: Parser = Parser(prompt)
        tokens: list[Token] = parser.tokenise()
        print(f"TOKEN GEN: {' '.join([t.name for t in tokens])}")
        context, [location, price, bedrooms, bathrooms] = parser.contextParser(tokens)

        return context, [location, price, bedrooms, bathrooms]

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
