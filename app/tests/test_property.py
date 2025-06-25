import unittest

from app.property.property import create_property, delete_property


class TestProperty(unittest.TestCase):
    def testCreation(self):
        data = {
            "propertyType": "flat",
            "bedrooms": 2,
            "bathrooms": 1,
            "name": "10",
            "street": "Downing Street",
            "town": "London",
            "postcode": "SW1A 2AA",
            "lID": 100
        }

        self.assertTrue(create_property(data))

    def testDeletion(self):
        self.assertFalse(delete_property(100))
