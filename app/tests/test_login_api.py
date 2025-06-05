import unittest
import os
import requests

class TestLoginAPI(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """
        Test method sets up test by calling the API.

        Returns:
            object: Request object
        """
        
        API_URL:str = "https://whondo.com/login/auth"
        API_DATA = {
            "email": "test@test.com",
            "password": "password123"
        }

        return requests.post(API_URL, json = API_DATA,)
    
    def testResponse(self):
        """
        Test method tests if request is a valid object and code 200 OK.
        """

        data = self.setUpClass()
      
        self.assertIsNotNone(data, "Request is not returning valid object")
        self.assertEqual(data.status_code, 200, f"Request is returing code: {data.status_code}")

    def testStatus(self):
        """
        Test method tests if request returns a valid status of true.
        """

        data = self.setUpClass()

        self.assertEqual(data.json()['status'], True, f"Request is returning status: {data.json()['status']}")

    def testMessage(self):
        """
        Test method tests if request returns a valid message.
        """

        data = self.setUpClass()

        self.assertEqual(data.json()['message'], "User: test@test.com logged in successfully")

class TestLoginAPIFail(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """
        Test method sets up test by calling the API.

        Returns:
            object: Request object
        """
        
        API_URL:str = "https://whondo.com/login/auth"
        API_DATA = {
            "email": "wrong@wrong.com",
            "password": "wrongpassword"
        }

        return requests.post(API_URL, json = API_DATA,)
    
    def testResponse(self):
        """
        Test method tests if request is a valid object and code 401 UNAUTHORISED.
        """

        data = self.setUpClass()

        self.assertIsNotNone(data, "Request is not returning valid object")
        self.assertEqual(data.status_code, 401, f"Request is returing code: {data.status_code}")

    def testErrorMessage(self):
        """
        Test method tests if returned error value is correct.
        """

        data = self.setUpClass()

        self.assertEqual(data.json()["error"], "User email does not match database records", f"Request is returing: {data.json()['error']}")

class TestInvalidData(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """
        Test method sets up test by calling the API.

        Returns:
            object: Request object
        """
        
        API_URL:str = "https://whondo.com/login/auth"
        API_DATA = {
            "email": "",
            "password": ""
        }

        return requests.post(API_URL, json = API_DATA,)
    
    def testResponse(self):
        """
        Test method tests if request is a valid object and code 400 BAD REQUEST.
        """

        data = self.setUpClass()

        self.assertEqual(data.status_code, 400, f"Request is returing code: {data.status_code}")

    def testErrorMessage(self):
        """
        Test method tests if returned error value is correct.
        """

        data = self.setUpClass()

        self.assertEqual(data.json()["error"], "User email or password not provided", f"Request is returing: {data.json()['error']}")

class TestPasswordFail(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        """
        Test method sets up test by calling the API.

        Returns:
            object: Request object
        """
        
        API_URL:str = "https://whondo.com/login/auth"
        API_DATA = {
            "email": "test@test.com",
            "password": "thisisnotapassword"
        }

        return requests.post(API_URL, json = API_DATA,)
    
    def testResponse(self):
        """
        Test method tests if request is a valid object and code 401 UNAUTHORISED.
        """

        data = self.setUpClass()

        self.assertIsNotNone(data, "Request is not returning valid object")
        self.assertEqual(data.status_code, 401, f"Request is returing code: {data.status_code}")

    def testStatus(self):
        """
        Test method tests if request returns a valid status of false.
        """

        data = self.setUpClass()

        self.assertEqual(data.json()['status'], False, f"Request is returning status: {data.json()['status']}")

    def testErrorMessage(self):
        """
        Test method tests if returned error value is correct.
        """

        data = self.setUpClass()

        self.assertEqual(data.json()["error"], "Incorrect password", f"Request is returing: {data.json()['error']}")
