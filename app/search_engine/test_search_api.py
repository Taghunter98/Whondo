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

    def testContext(self):
        prompt = "I want to live in London in a two bed one bath flat for 2000 pcm that is near a tube station, bus access, bills included, with a balcony and garden. It needs to have no guarantor and great cycle access as well as storage. Be great to have wheelchair support and pets to be allowed."

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "london")
        self.assertEqual(price, 2000)
        self.assertEqual(bedrooms, 2)
        self.assertEqual(bathrooms, 1)
        self.assertCountEqual(
            names,
            [
                "flat",
                "close_to_station",
                "bus_route",
                "bills_included",
                "balcony",
                "garden",
                "no_guarantor",
                "cycle_friendly",
                "bike_storage",
                "wheelchair_accessible",
                "pets_allowed",
            ],
            f"Returning: {names}",
        )

    def testPhraseContext(self):
        tokens = [
            Token("close"),
            Token("to"),
            Token("station"),
            Token("no"),
            Token("guarantor"),
            Token("let"),
        ]
        res = [t.name for t in Parser.phraseContext(self, tokens)]

        self.assertEqual(res, ["close_to_station", "no_guarantor"])

    def testPromptOne(self):
        prompt: str = "I want to rent a flat in Canterbury that's £2000 a month, allows a pet and near the university of Kent 2 bedrooms and 1 bathroom"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "canterbury")
        self.assertEqual(price, 2000)
        self.assertEqual(bedrooms, 2)
        self.assertEqual(bathrooms, 1)
        self.assertCountEqual(
            names, ["flat", "pets_allowed", "near_university"], f"Returning: {context}"
        )

    def testPromptTwo(self):
        prompt = "Looking for a furnished house in Manchester, £1500 per week, with en suite and bike storage, near the station"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "manchester")
        self.assertEqual(price, 1500)
        self.assertCountEqual(
            names,
            ["furnished", "house", "en_suite", "bike_storage", "close_to_station"],
        )

    def testPromptThree(self):
        prompt = "Need a zero deposit studio in Edinburgh for £850 a month, wheelchair accessible and lgbtq friendly"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "edinburgh")
        self.assertEqual(price, 850)
        self.assertCountEqual(
            names,
            ["no_deposit", "studio", "wheelchair_accessible", "lgbtq_friendly"],
        )

    def testPromptFour(self):
        prompt = "Show me a social house in Bristol with bills included and no guarantor, costing £1200 a month"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "bristol")
        self.assertEqual(price, 1200)
        self.assertCountEqual(
            names,
            ["social_house", "house", "bills_included", "no_guarantor"],
        )

    def testPromptFive(self):
        prompt = "I want a cycle friendly flat in London, long term let, £2200 per month, near the university"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "london")
        self.assertEqual(price, 2200)
        self.assertCountEqual(
            names,
            ["cycle_friendly", "flat", "long_let", "near_university"],
        )

    def testPromptSix(self):
        prompt = "Searching for a vegan household penthouse in York, short-term let, £3000 a month"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "york")
        self.assertEqual(price, 3000)
        self.assertCountEqual(
            names,
            ["vegan_household", "penthouse", "short_let"],
        )

    def testPromptSeven(self):
        prompt = "Need a parking balcony apartment in Nottingham, zone 3 access, bus route nearby, £700 per week"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "nottingham")
        self.assertEqual(price, 700)
        self.assertCountEqual(
            names,
            ["parking", "balcony", "flat", "zone_3", "bus_route"],
        )

    def testPromptEight(self):
        prompt = "A double room in Leeds, unfurnished, near bus route, £600 a month"

        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "leeds")
        self.assertEqual(price, 600)
        self.assertCountEqual(
            names,
            ["double_room", "unfurnished", "bus_route"],
        )

    def testPromptTen(self):
        prompt = "Zone 3 in London, three bed two bath flat, furnished, under £1200 pcm"
        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "london")
        self.assertEqual(price, 1200)
        self.assertEqual(bedrooms, 3)
        self.assertEqual(bathrooms, 2)
        self.assertCountEqual(names, ["zone_3", "flat", "furnished"])

    def testPromptEleven(self):
        prompt = (
            "I need a shared house in Sheffield, 450 pcm, with internet and parking"
        )
        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "sheffield")
        self.assertEqual(price, 450)
        self.assertIsNone(bedrooms)
        self.assertIsNone(bathrooms)
        self.assertCountEqual(names, ["shared_house", "wifi_included", "parking"])

    def testPromptTwelve(self):
        prompt = "Double room for ten pounds a day in Brighton, with no guarantor, lift access."
        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "brighton")
        self.assertEqual(price, 10)
        self.assertIsNone(bedrooms)
        self.assertIsNone(bathrooms)
        self.assertCountEqual(names, ["double_room", "no_guarantor", "lift"])

    def testPromptThirteen(self):
        prompt = "A 2 bed 1 bath apartment in Bristol, £1,200 a month, cycle access"
        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "bristol")
        self.assertEqual(price, 1200)
        self.assertEqual(bedrooms, 2)
        self.assertEqual(bathrooms, 1)
        self.assertCountEqual(names, ["flat", "cycle_friendly"])

    def testPromptFourteen(self):
        prompt = "Looking for a one bedroom semi-furnished place in Durham, up to £750 per calendar month"
        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "durham")
        self.assertEqual(price, 750)
        self.assertEqual(bedrooms, 1)
        self.assertIsNone(bathrooms)
        self.assertCountEqual(names, ["furnished"])

    def testPromptFifteen(self):
        prompt = "Studio flat in Exeter, £300pw, bills, pets allowed!"
        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "exeter")
        self.assertEqual(price, 300)
        self.assertIsNone(bedrooms)
        self.assertIsNone(bathrooms)
        self.assertCountEqual(names, ["studio", "bills_included", "pets_allowed"])

    def testPromptSixteen(self):
        prompt = "One thousand five hundred a year in Cambridge, close to station, no deposit."
        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "cambridge")
        self.assertEqual(price, 1500)
        self.assertIsNone(bedrooms)
        self.assertIsNone(bathrooms)
        self.assertCountEqual(names, ["close_to_station", "no_deposit"])

    def testPromptSeventeen(self):
        prompt = (
            "2 bed flat near university, 650 per month, electric utilities included"
        )
        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(price, 650)
        self.assertEqual(bedrooms, 2)
        self.assertIsNone(bathrooms)
        self.assertCountEqual(names, ["flat", "near_university", "utilities_included"])

    def testPromptNoPrice(self):
        prompt = "One bed flat in Cardiff near bus route"
        context, (location, price, bedrooms, bathrooms) = self.runPrompt(prompt)
        names = [t.name for t in context]

        self.assertEqual(location, "cardiff")
        self.assertIsNone(price)
        self.assertEqual(bedrooms, 1)
        self.assertIsNone(bathrooms)
        self.assertCountEqual(names, ["flat", "bus_route"])
