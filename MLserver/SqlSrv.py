import pyodbc

SERVER = "127.0.0.1"
DATABASE = "speechs"
USERNAME = "SA"
PASSWORD = "Type Your Password Here"
connectionString = f"DRIVER={{ODBC Driver 17 for SQL Server}};SERVER={SERVER};DATABASE={DATABASE};UID={USERNAME};PWD={PASSWORD}"


def insertIntoDatabase(text, userName, dt, polarity, subjectivity):
    conn = pyodbc.connect(connectionString)
    cursor = conn.cursor()

    cursor.execute(
        f"INSERT INTO dbo.grabbedText (grabbed,username,dt,polarity,subjectivity) VALUES (?,?,?,?,?)",
        text,
        userName,
        dt,
        polarity,
        subjectivity,
    )
    conn.commit()

    cursor.close()
    conn.close()
