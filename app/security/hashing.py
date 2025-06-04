from bcrypt import gensalt, hashpw, checkpw

def hash_pasword(input:str) -> str:
    """
    A function to hash passwords to store in the
    database using bcrypt.

    Args:
        input (str): Plaintext password

    Returns:
        str: Hashed password value
    """

    bytes:str = input.encode("utf-8")
    salt:str  = gensalt()
    hash:str  = hashpw(bytes, salt)
    
    return hash

def check_password(input:str, comparable:str) -> bool:
    """
    A function to check a plaintext password against
    the hashed version in the database.

    Args:
        input (str): Plaintext password attempt
        comparable (str): Databse hashed password

    Returns:
        bool: Boolean value for match
    """

    user_input:str = input.encode("utf-8")
    is_valid:bool  = checkpw(user_input, comparable)
    
    return is_valid