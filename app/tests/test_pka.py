import unittest
import os

from app.property.property_keyword_advert import get_ids


@unittest.skipIf(
    os.environ.get("CI") == "true",
    "Skipping test in CI pipeline: This test needs DB access",
)
class TestPropertyKeywordAdvert(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        return get_ids(100)

    def testDatatype(self):
        data = self.setUpClass()

        self.assertEqual(type(data), list)

    def testDataIsValid(self):
        data = self.setUpClass()
   
        self.assertEqual(data[0]["pID"], 105, f"Function is returning: {data}")
        self.assertEqual(data[0]["kID"], 130, f"Function is returning: {data}")
        self.assertEqual(data[0]["adID"], 105, f"Function is returning: {data}")