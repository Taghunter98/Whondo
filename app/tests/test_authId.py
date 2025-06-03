import unittest
import os

from app.users.authid import authenticate

class TestAuthID(unittest.TestCase):

    @unittest.skipIf(os.getenv("CI"), "Skipping test in CI pipeline")
    def testAuthRed(self):
        user:str = "josh@test.com"
        self.assertEqual(authenticate(user), -1, "ERROR: Function is not handling error correctly")
    
    @unittest.skipIf(os.getenv("CI"), "Skipping test in CI pipeline")
    def testAuthGreen(self):
        user:str = "test@test.com"
        self.assertNotEqual(authenticate(user), -1, "ERROR: Function is not returning valid uID")