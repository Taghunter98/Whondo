import unittest
import os
import requests
import io

from app.property.property import create_property, update_property, delete_property
from app.property.keywords import store_keywords
from app.property.advert import create_advert, delete_advert


@unittest.skipIf(
    os.environ.get("CI") == "true",
    "Skipping test in CI pipeline: This test needs DB access",
)
class TestProperty(unittest.TestCase):
    def testCreation(self):
        """
        Test method tests that property was created successfully.
        """
        data = {
            "propType": "flat",
            "bedrooms": 2,
            "bathrooms": 1,
            "name": "10",
            "street": "Downing Street",
            "town": "London",
            "county": "City of London",
            "postcode": "SW1A 2AA"
        }

        self.assertEqual(
            type(create_property(data)), int, f"Property is returning {data}"
        )

    def testUpdate(self):
        """
        Test method tests that property was updated successfully.
        """
        data = {
            "propType": "house",
            "bedrooms": 240,
            "bathrooms": 78,
            "name": "Buckingham Palace",
            "street": "The Mall",
            "town": "London",
            "county": "City of London",
            "postcode": "SW1A 1AA"
        }

        self.assertTrue(update_property(data), "Property was not updated")

    def testDeletion(self):
        """
        Test method tests that the property was deleted successfully.
        """
        self.assertTrue(delete_property(100), "Property was not deleted")


@unittest.skipIf(
    os.environ.get("CI") == "true",
    "Skipping test in CI pipeline: This test needs DB access",
)
class TestKeywords(unittest.TestCase):
    def testKeywordInsertion(self):
        """
        Test method tests that keywords were stored successfully.
        """
        ALL_KEYWORDS = [
            "house",
            "flat",
            "bungalow",
            "studio",
            "bedsit",
            "maisonette",
            "shared_house",
            "student_accommodation",
            "en_suite",
            "penthouse",
            "furnished",
            "unfurnished",
            "bills_included",
            "all_inclusive",
            "double_room",
            "single_room",
            "balcony",
            "garden",
            "parking",
            "pets_allowed",
            "pet_friendly",
            "wifi_included",
            "utilities_included",
            "short_let",
            "long_let",
            "no_deposit",
            "low_deposit",
            "zero_deposit",
            "dss_accepted",
            "guarantor_required",
            "no_guarantor",
            "student_friendly",
            "city_centre",
            "near_university",
            "close_to_station",
            "bus_route",
            "zone_1",
            "zone_2",
            "zone_3",
            "zone_4",
            "cycle_friendly",
            "LGBTQ_friendly",
            "vegan_household",
            "non_smoking",
            "smoking_allowed",
            "social_house",
            "quiet_house",
            "wheelchair_accessible",
            "lift",
            "ground_floor",
            "bike_storage",
        ]

        self.assertIsNotNone(store_keywords(ALL_KEYWORDS), "Keywords were not stored")


@unittest.skipIf(
    os.environ.get("CI") == "true",
    "Skipping test in CI pipeline: This test needs DB access",
)
class TestAdvert(unittest.TestCase):
    def testCreation(self):
        """
        Test method tests that the advert was created successfully.
        """
        data = {
            "title": "Test title",
            "description": "Test description",
            "price": 1000,
            "tennants": 4
        }

        images = ["test1.png", "test2.png", "test3.png", "test4.png", None, None, None, None, None, None]

        self.assertEqual(
            type(create_advert(data, images)), int, "Advert was not created"
        )

    def testDeletion(self):
        """
        Test method tests that the advert was deleted successfully.
        """
        self.assertTrue(delete_advert(100), "Advert was not deleted")
