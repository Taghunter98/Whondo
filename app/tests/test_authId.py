import unittest
import os

from app.users.authid import authenticate

@unittest.skipIf(os.getenv("CI"), "Skipping test in CI pipeline")
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
        self.assertNotEqual(result, None, "ERROR: Function is not returning valid uID")

    def testValidInteger(self):
        """
        Test method tests if authenticate result is a valid integer.
        """

        result = self.setUpClass()
        self.assertTrue(isinstance(result, int), "ERROR: User ID is not a valid integer")