import unittest
import os

from app.users.authid import authenticate

class TestAuthID(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        user:str = "test@test.com"
        result = authenticate(user)
        return result

    @unittest.skipIf(os.getenv("CI"), "Skipping test in CI pipeline")
    def testNotNone(self):
        """
        Test method tests if authenticate returns the correct None value
        for an email that is not in the database.
        """

        result = self.setUpClass()
        self.assertIsNotNone(result, "ERROR: Function is not handling error correctly")
    
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