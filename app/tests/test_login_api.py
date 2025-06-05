import unittest
import os
import requests

class TestLoginAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):

        return requests.post(
            "https://whondo.com/login/auth",
            data = {"email":"test@test.com", "password": "password123"},
            headers = {"Content-Type":"application/json"}
        )
    
    def testValidRequest(self):

        data = self.setUpClass()
        
        self.assertIsNotNone(data, "Request is not returning valid object")
        self.assertEqual(data.status_code, 200, f"Request is returing code: {data.status_code} data: {data.error}")
