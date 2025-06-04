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
        
        hash:bytes = self.setUpClass()
        result:bool = check_password("password123", hash.decode("utf-8"))
        self.assertTrue(result, "ERROR: Password doesn't match hash")

    def testPasswordFail(self):
        """
        Test method tests if check_password returns a false
        value with an incorrect plaintext pasword.
        """

        hash:bytes = self.setUpClass()
        result:bool = check_password("password1234", hash)
        self.assertFalse(result, f"ERROR: Password matching function returned: {result}")

    def testHashIsBytes(self):
        """
        Test method tests if hashed value provided is a byte object.
        """

        hash:bytes = self.setUpClass()
        self.assertTrue(isinstance(hash, bytes), f"ERROR: Hash is {type(hash)} value: {hash}")