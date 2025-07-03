import unittest
import os
import requests

from app.property.property import create_property, update_property, delete_property
from app.property.keywords import store_keywords


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
            "postcode": "SW1A 2AA",
            "lID": 100,
        }

        self.assertIsNotNone(create_property(data), "Property was not created")

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
            "postcode": "SW1A 1AA",
            "lID": 100,
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
class TestAdvertSuccess(unittest.TestCase):

    def testSuccess(self):
        URL = "https://whondo.com/advert/new"
        API_DATA = {
            "title": "The home of the Prime Minister",
            "description": "Very spacious and central location",
            "keywords": ["house", "zone_1", "furnished", "city_centre"],
            "propType": "house",
            "bedrooms": 240,
            "bathrooms": 78,
            "name": "Buckingham Palace",
            "street": "The Mall",
            "town": "London",
            "county": "City of London",
            "postcode": "SW1A 1AA",
            "lID": 100,
        }

        resp = requests.post(URL, json=API_DATA)
        
        self.assertEqual(resp.status_code, 201, f"Response is returning {resp.status_code}")
    
    def testFail(self):
        URL = "https://whondo.com/advert/new"
        API_DATA = {
            
            "description": "Very spacious and central location",
            "keywords": ["house", "zone_1", "furnished", "city_centre"],
            "propType": "house",
            "bedrooms": 240,
            "bathrooms": 78,
            "name": "Buckingham Palace",
            "street": "The Mall",
            "town": "London",
            "county": "City of London",
            "postcode": "SW1A 1AA",
            "lID": 100,
        }

        resp = requests.post(URL, json=API_DATA)

        self.assertEqual(resp.status_code, 400, f"Response is returning {resp.status_code}")

    def testPropertyFail(self):
        URL = "https://whondo.com/advert/new"
        API_DATA = {
            "title": "The home of the Prime Minister",
            "description": "Very spacious and central location",
            "keywords": ["house", "zone_1", "furnished", "city_centre"],
            "lID": 100,
        }

        resp = requests.post(URL, json=API_DATA)

        self.assertEqual(resp.status_code, 400, f"Response is returning {resp.status_code}")

    def testLandlordAuth(self):
        URL = "https://whondo.com/advert/new"
        API_DATA = {
            "title": "The home of the Prime Minister",
            "description": "Very spacious and central location",
            "keywords": ["house", "zone_1", "furnished", "city_centre"],
            "propType": "house",
            "bedrooms": 240,
            "bathrooms": 78,
            "name": "Buckingham Palace",
            "street": "The Mall",
            "town": "London",
            "county": "City of London",
            "postcode": "SW1A 1AA",
            "lID": 0,
        }

        resp = requests.post(URL, json=API_DATA)

        self.assertEqual(resp.status_code, 401, f"Response is returning {resp.status_code}")