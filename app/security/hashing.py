from bcrypt import gensalt, hashpw, checkpw

def hash_pasword(input:str) -> bytes:
    """
    A function to hash passwords to store in the database using 
    bcrypt. The function first encodes the plaintext into a bytes
    object, generates a salt for security, then hashes the password.

    Args:
        input (str): Plaintext password

    Returns:
        bytes: Hashed password value
    """

    encoded_input:bytes = input.encode("utf-8")
    salt:bytes  = gensalt()
    hash:bytes  = hashpw(encoded_input, salt)
    
    return hash

def check_password(input:str, comparable:str) -> bool:
    """
    A function to check a plaintext password against the hashed version
    in the database. Function first encodes the plaintext into a bytes
    object, then compares it with the comparable string hash, that is
    encoded into a bytes object.

    Args:
        input (str): Plaintext password attempt
        comparable (str): Databse hashed password as string

    Returns:
        bool: Boolean value for match
    """

    user_input:bytes = input.encode("utf-8")
    is_valid:bool  = checkpw(user_input, comparable.encode("utf-8"))
    
    return is_valid