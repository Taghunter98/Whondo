# Simple script that runs all unit tests

source wserv/bin/activate
# pip install -r requirements.txt
python3 -m unittest discover -s app/tests -p "*.py"