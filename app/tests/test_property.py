import unittest

from app.property.property import create_property, delete_property


class TestProperty(unittest.TestCase):
    def testCreation(self):
        data = {
            "propType": "flat",
            "bedrooms": 2,
            "bathrooms": 1,
            "name": "10",
            "street": "Downing Street",
            "town": "London",
            "postcode": "SW1A 2AA",
            "lID": 100
        }

        self.assertTrue(create_property(data), "Property was not created")

    def testDeletion(self):
        self.assertFalse(delete_property(100), "Property was not deleted")
