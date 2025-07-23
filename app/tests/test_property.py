import unittest
import os

from app.property.property import create_property, update_property, delete_property
from app.property.keywords import (
    store_keywords,
    delete_keywords,
    reset_keywords,
    update_keywords,
)
from app.property.advert import create_advert, delete_advert



@unittest.skipIf(
    os.environ.get("CI") == "true",
    "Skipping test in CI pipeline: This test needs DB access",
)
class TestProperty(unittest.TestCase):
    def testProperty(self):
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
        }

        new_data = {
            "propType": "house",
            "bedrooms": 5,
            "bathrooms": 3,
            "name": "4",
            "street": "Privet Drive",
            "town": "London",
            "county": "City of London",
            "postcode": "SW1A 2AA",
        }

        pID: int = create_property(data)
        self.assertEqual(type(pID), int, f"Property is returning {data}")
        self.assertTrue(update_property(new_data, pID), "Property was not deleted")
        self.assertTrue(delete_property(pID), "Property was not deleted")


@unittest.skipIf(
    os.environ.get("CI") == "true",
    "Skipping test in CI pipeline: This test needs DB access",
)
class TestKeywords(unittest.TestCase):
    def testKeywords(self):
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
            "wifi_included",
            "utilities_included",
            "short_let",
            "long_let",
            "no_deposit",
            "low_deposit",
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
            "lgbtq_friendly",
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

        kID: int = store_keywords(ALL_KEYWORDS)
        self.assertIsNotNone(kID, "Keywords were not stored")
        self.assertTrue(reset_keywords(kID), "Keywords were not reset")
        self.assertTrue(
            update_keywords(
                kID,
                [
                    "house",
                    "flat",
                    "bungalow",
                ],
            ),
            "Keywords were not updated",
        )
        self.assertTrue(delete_keywords(kID), "Keywords were not deleted")


@unittest.skipIf(
    os.environ.get("CI") == "true",
    "Skipping test in CI pipeline: This test needs DB access",
)
class TestAdvert(unittest.TestCase):
    def testAdvert(self):
        """
        Test method tests that the advert was created successfully.
        """
        data = {
            "title": "Test title",
            "description": "Test description",
            "price": 1000,
            "tennants": 4,
        }

        images = [
            "test1.png",
            "test2.png",
            "test3.png",
            "test4.png",
            None,
            None,
            None,
            None,
            None,
            None,
        ]

        adID: int = create_advert(data, images)
        self.assertEqual(type(adID), int, "Advert was not created")
        self.assertTrue(delete_advert(adID), "Advert was not deleted")
