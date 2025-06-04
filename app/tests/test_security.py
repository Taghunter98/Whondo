import unittest

from app.security.hashing import hash_pasword, check_password

class TestSecurityHashing(unittest.TestCase):

    @classmethod
    def setUpClass(cls):

        input:str = "password123"
        hash:str = hash_pasword(input)
        return hash
    
    def testPasswordMatch(self):
        
        hash:str = self.setUpClass()
        result:bool = check_password("password123", hash)
        self.assertTrue(result, "ERROR: Password doesn't match hash")

    def testPasswordFail(self):

        hash:str = self.setUpClass()
        result:bool = check_password("password1234", hash)
        self.assertFalse(result, f"ERROR: Password matching function returned: {result}")

    def testHashIsString(self):

        hash:str = self.setUpClass()