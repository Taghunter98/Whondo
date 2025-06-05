import unittest
import os
import requests

class TestLoginAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        
        URL:str = "https://whondo.com/login/auth"
        DATA = {
            "email": "test@test.com",
            "password": "password123"
        }

        return requests.post(URL, json = DATA,)
    
    def testValidRequest(self):

        data = self.setUpClass()
      
        self.assertIsNotNone(data, "Request is not returning valid object")
        self.assertEqual(data.status_code, 200, f"Request is returing code: {data.status_code}")
