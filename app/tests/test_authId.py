import unittest
import os

from app.users.authid import authenticate

class TestAuthID(unittest.TestCase):

    @unittest.skipIf(os.getenv("CI"), "Skipping test in CI pipeline")
    def testIncorrectAuth(self):
        """
        Test method tests if authenticate returns the correct None value
        for an email that is not in the database.
        """

        user:str = "josh@test.com"
        result = authenticate(user)

        self.assertIsNone(result, "ERROR: Function is not handling error correctly")
    
    @unittest.skipIf(os.getenv("CI"), "Skipping test in CI pipeline")
    def testCorrectAuth(self):
        """
        Test method tests if authenticate returns a valid result that is not None
        and is an integer.
        """

        user:str = "test@test.com"
        result = authenticate(user)
        
        self.assertNotEqual(result, None, "ERROR: Function is not returning valid uID")
        self.assertTrue(isinstance(result, int), "ERROR: User ID is not a valid integer")