import unittest

from app.security.hashing import hash_pasword, check_password

class TestSecurityHashing(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """
        Test method sets up comparable password value that
        is hashed.

        Returns:
            bytes: Hashed password value
        """

        input:str = "password123"
        hash:bytes = hash_pasword(input)
        return hash
    
    def testPasswordMatch(self):
        """
        Test method tests if check_password returns a true
        value with a correct plaintext password.
        """
        
        hash: str    = self.setUpClass()
        result: bool = check_password("password123", hash)
        self.assertTrue(result, "Password doesn't match hash")

    def testPasswordFail(self):
        """
        Test method tests if check_password returns a false
        value with an incorrect plaintext pasword.
        """

        hash: str    = self.setUpClass()
        result: bool = check_password("password1234", hash)
        self.assertFalse(result, f"Password matching function returned: {result}")

    def testHashIsString(self):
        """
        Test method tests if hashed value provided is a string object.
        """

        hash: str = self.setUpClass()
        self.assertTrue(isinstance(hash, str), f"Hash is {type(hash)} value: {hash}")