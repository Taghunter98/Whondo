import unittest
import requests


class TestImageUpload(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """
        Test method sets up test by calling the API.

        Returns:
            object: Request object
        """

        return requests.get("https://www.whondo.com/uploads?path=TEST/wilson.jpg")

    def testResponse(self):
        """
        Test method checks if request is a valid object and code 200 OK.
        """

        data = self.setUpClass()

        self.assertIsNotNone(data, "Request is not returning data")
        self.assertEqual(
            data.status_code, 200, f"Request is returning code: {data.status_code}"
        )


class TestImageNotFound(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """
        Test method sets up test by calling the API with an invalid path.

        Returns:
            object: Response object
        """

        return requests.get("https://www.whondo.com/uploads?path=Profile")

    def testResponse(self):
        """
        Test method tests if request is a valid object and code 404 NOT FOUND.
        """

        data = self.setUpClass()

        self.assertIsNotNone(data, "Request is not returning data")
        self.assertEqual(
            data.status_code, 404, f"Request is returning code: {data.status_code}"
        )


class TestImageFail(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        """
        Test method sets up test by calling the API with no path value.

        Returns:
            object: Response object
        """

        return requests.get("https://www.whondo.com/uploads?path=")

    def testResponse(self):
        """
        Test method tests if request is valid object and code 400 BAD REQUEST.
        """

        data = self.setUpClass()

        self.assertIsNotNone(data, "Request is not returning data")
        self.assertEqual(
            data.status_code, 404, f"Request is returning code: {data.status_code}"
        )
