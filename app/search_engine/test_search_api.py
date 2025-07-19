import unittest
import requests

class TestSearchAPI(unittest.TestCase):
    def testResult(self):
        prompt = "I want to live in Canterbury in a 2 bed flat"
        data = requests.post(url="https://whondo.com/search", json={"prompt": prompt})