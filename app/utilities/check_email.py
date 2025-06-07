from app.database.db_connect import connect

def check_email_exits(email: str) -> bool:

    connection: object = connect()
    cursor: object     = connection.cursor()

    query: str = """
        SELECT COUNT(*) 
        FROM Users 
        WHERE email = %s;
    """

    cursor.execute(query, (email,))
    count: int = cursor.fetchone()
    print(count)

    cursor.close()
    connection.close()

    return True if (1 in count) else  False
    
