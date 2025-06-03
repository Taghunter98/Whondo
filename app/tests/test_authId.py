import unittest
import os

from app.users.authid import authenticate

class TestAuthID(unittest.TestCase):

    @unittest.skipIf(os.getenv("CI"), "Skipping test in CI pipeline")
    def testAuthRed(self):

        user:str = "josh@test.com"
        result = authenticate(user)

        self.assertIsNone(result, "ERROR: Function is not handling error correctly")
    
    @unittest.skipIf(os.getenv("CI"), "Skipping test in CI pipeline")
    def testAuthGreen(self):

        user:str = "test@test.com"
        result = authenticate(user)
        
        self.assertNotEqual(result, -1, "ERROR: Function is not returning valid uID")