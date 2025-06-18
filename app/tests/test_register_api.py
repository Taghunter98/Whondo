import unittest
import requests


class TestRegisterAPI(unittest.TestCase):
    @classmethod
    def setUpClass(self):
        self.URL = "https://whondo.com/register"

    def testRequiredFields(self):
        """
        Test method tests that required fields are accepted only.
        """

        JSON = {
            "email": "thisisatest@test.com",
            "password": "password",
            "name": "Joe",
            "surname": "Cool",
        }

        response = requests.post(url=self.URL, data=JSON)

        self.assertEqual(response.status_code, 400, f"Response: {response.status_code}")
        self.assertEqual(
            response.json()["error"],
            "Required fields not provided",
            f"Response: {response.json()}",
        )

    def testAccountExists(self):
        """
        Test method tests that accounts that already exist are not created.
        """

        JSON = {
            "email": "test@test.com",
            "password": "password",
            "name": "Joe",
            "surname": "Cool",
            "age": 26,
        }

        response = requests.post(url=self.URL, data=JSON)
        self.assertEqual(response.status_code, 403, f"Response: {response.status_code}")
        self.assertEqual(
            response.json()["error"],
            "Account already exists",
            f"Response: {response.json()}",
        )
