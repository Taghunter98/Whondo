from app.database.db_connect import connect

def authenticate(email:str):
    """
    A function to authenticate users, by returning the user ID
    by querying the database with the provided email.

    Args:
        email (str): The user's email

    Returns:
        int: The user ID (uID)
    """

    if not email:
        print("ERROR: Email not supplied")
        return -1
        
    connection = connect()
    cursor = connection.cursor()

    query = f"""
        SELECT u.uID, u.email 
        FROM Users u 
        WHERE u.email = "{email}" 
        GROUP BY u.uID
    """
    cursor.execute(query)

    user_id:int = int(cursor.fetchone()[0])

    if (user_id):
        return user_id
    else:
        print("ERROR: Email does not match uID records in database")
        return -1