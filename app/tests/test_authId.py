import unittest
import os

from app.users.authid import authenticate

@unittest.skipIf(os.environ.get("CI") == "true", "Skipping test in CI pipeline: This test needs DB access")
class TestAuthID(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        user:str = "test@test.com"
        result = authenticate(user)
        return result

    def testNotNone(self):
        """
        Test method tests if authenticate returns a valid result
        that is not None.
        """

        result = self.setUpClass()
        self.assertIsNotNone(result, "ERROR: Function is returning None for valid uID")
    
    def testCorrectAuth(self):
        """
        Test method tests if authenticate returns a valid result.
        """

        result = self.setUpClass()
        self.assertEqual(result, 100, f"ERROR: Function is returning uID: {result}")

    def testValidInteger(self):
        """
        Test method tests if authenticate result is a valid integer.
        """

        result = self.setUpClass()
        self.assertTrue(isinstance(result, int), "ERROR: User ID is not a valid integer")