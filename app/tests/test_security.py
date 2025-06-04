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
        result:bool = check_password("password", hash)
        self.assertTrue(result)

    def testPasswordFail(self):

        hash:str = self.setUpClass()
        result:bool = check_password("password1234", hash)