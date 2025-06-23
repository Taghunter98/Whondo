import unittest
import os

from app.utilities.authid import authenticate
from app.utilities.check_email import check_email_exits
from app.utilities.key_gen import gen_key


@unittest.skipIf(
    os.environ.get("CI") == "true",
    "Skipping test in CI pipeline: This test needs DB access",
)
class TestAuthID(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """
        Test method sets up authenticate result for testing.

        Returns:
            int: User ID (uID)
        """

        user: str = "test@test.com"
        result: int = authenticate(user)
        return result

    def testNotNone(self):
        """
        Test method tests if authenticate returns a valid result
        that is not None.
        """

        result = self.setUpClass()
        self.assertIsNotNone(result, "Function is returning None for valid uID")

    def testCorrectAuth(self):
        """
        Test method tests if authenticate returns a valid result.
        """

        result = self.setUpClass()
        self.assertEqual(result, 100, f"Function is returning uID: {result}")

    def testValidInteger(self):
        """
        Test method tests if authenticate result is a valid integer.
        """

        result = self.setUpClass()
        self.assertTrue(isinstance(result, int), "User ID is not a valid integer")


@unittest.skipIf(
    os.environ.get("CI") == "true",
    "Skipping test in CI pipeline: This test needs DB access",
)
class TestEmailExists(unittest.TestCase):
    def testEmailExits(self):
        """
        Test methods tests if email exists in database.
        """

        result: bool = check_email_exits("test@test.com")
        self.assertTrue(result, f"Function is returning: {result}")

    def testEmailInvalid(self):
        """
        Test methods tests if email doesn't exist in database
        """

        result: bool = check_email_exits("notinthedb@test.com")
        self.assertFalse(result, f"Function is returning: {result}")

class TestGenKey(unittest.TestCase):
    def __init__(self, methodName = "runTest"):
        super().__init__(methodName)
        self.key: str = gen_key()

    def testNotNone(self):
        self.assertIsNotNone(self.key)

    def testKeyType(self):
        self.assertIs(self.key, str)
    
    def testKeyLen(self):
        self.assertEqual(len(self.key), 30)