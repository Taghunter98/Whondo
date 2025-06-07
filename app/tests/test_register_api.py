import unittest
import requests
import os

class TestRegisterAPI(unittest.TestCase):

    def testRequiredFields(self):
        URL = 'https://whondo.com/register/create'
        JSON = {
            "email" : "thisisatest@test.com",
            "password" : "password",
            "name": "Joe",
            "surname" : "Cool",
        }
        
        response = requests.post(url=URL, data = JSON).json()
        self.assertTrue(response['error'], f"Response: {response}")
        