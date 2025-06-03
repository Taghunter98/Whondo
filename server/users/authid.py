from ...server.database.connect import connect

def authenticate(email:str):

    if not email:
        print("ERROR: Email not supplied")
        
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
        print(f"Email: {email} -> ID: {user_id}")
        return user_id
    else:
        print("ERROR: Email does not match any ID records")

authenticate("test@test.com")