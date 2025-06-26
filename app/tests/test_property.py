import unittest

from app.property.property import create_property, update_property, delete_property


class TestProperty(unittest.TestCase):
    def testCreation(self):
        """
        Test method tests that property was created successfully.
        """
        data = {
            "propType": "flat",
            "bedrooms": "2",
            "bathrooms": "1",
            "name": "10",
            "street": "Downing Street",
            "town": "London",
            "county": "City of London",
            "postcode": "SW1A 2AA",
            "lID": "100",
        }

        self.assertTrue(create_property(data), "Property was not created")

    def testUpdate(self):
        """
        Test method tests that property was updated successfully.
        """
        data = {
            "propType": "house",
            "bedrooms": "240",
            "bathrooms": "78",
            "name": "Buckingham Palace",
            "street": "The Mall",
            "town": "London",
            "county": "City of London",
            "postcode": "SW1A 1AA",
            "lID": "100",
        }

        self.assertTrue(update_property(data), "Property was not updated")

    # def testDeletion(self):
    #     """
    #     Test method tests that the property was deleted successfully.
    #     """
    #     self.assertTrue(delete_property(100), "Property was not deleted")
