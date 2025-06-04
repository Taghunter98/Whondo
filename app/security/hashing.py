from bcrypt import gensalt, hashpw, checkpw

def hash_pasword(input:str) -> bytes:
    """
    A function to hash passwords to store in the
    database using bcrypt.

    Args:
        input (str): Plaintext password

    Returns:
        bytes: Hashed password value
    """

    encoded_input:bytes = input.encode("utf-8")
    salt:bytes  = gensalt()
    hash:bytes  = hashpw(encoded_input, salt)
    
    return hash

def check_password(input:str, comparable:bytes) -> bool:
    """
    A function to check a plaintext password against
    the hashed version in the database.

    Args:
        input (str): Plaintext password attempt
        comparable (bytes): Databse hashed password

    Returns:
        bool: Boolean value for match
    """

    user_input:bytes = input.encode("utf-8")
    is_valid:bool  = checkpw(user_input, comparable)
    
    return is_valid