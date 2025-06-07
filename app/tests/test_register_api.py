import unittest
import requests
import os

class TestRegisterAPI(unittest.TestCase):

    @classmethod
    def setUpClass(self):
        self.URL = 'https://whondo.com/register/create'

    def testRequiredFields(self):
       
        JSON = {
            "email" : "thisisatest@test.com",
            "password" : "password",
            "name": "Joe",
            "surname" : "Cool",
        }
        
        response = requests.post(url=self.URL, data = JSON).json()
        self.assertIn(response['error'], response, f"Response: {response}")
    
    def testAccountExists(self):
        
        JSON = {
            "email" : "thisisatest@test.com",
            "password" : "password",
            "name": "Joe",
            "surname" : "Cool",
            "age" : 26
        }

        response = requests.post(url=self.URL, data = JSON).json()
        self.assertIn(response['error'], response, f"Response: {response}")