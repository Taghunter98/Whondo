import unittest
import requests

class TestImageUpload(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        
        return requests.get("https://www.whondo.com/uploads?path=Profile/bassettjosh397@gmail.com/2025-06-07_bassettjosh397@gmail.com_wilson.jpg")
    
    def testResponse(self):

        data = self.setUpClass()

        self.assertIsNotNone(data, "Request is not returning data")
        self.assertEqual(data.status_code, 200, f"Request is returning code: {data.status_code}")