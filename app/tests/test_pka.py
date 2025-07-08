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
        """
        Test method sets up test by returning the get_ids data.

        Returns:
            list: Data from database
        """
        return get_ids(100)

    def testDatatype(self):
        """
        Test method test that the object type is a list.
        """
        data = self.setUpClass()

        self.assertEqual(type(data), list)

    def testDataIsValid(self):
        """
        Test method tests that the data is valid based of the test data.
        """
        data = self.setUpClass()

        self.assertEqual(data[0]["pID"], 105, f"Function is returning: {data}")
        self.assertEqual(data[0]["kID"], 130, f"Function is returning: {data}")
        self.assertEqual(data[0]["adID"], 105, f"Function is returning: {data}")
