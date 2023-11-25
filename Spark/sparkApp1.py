from pyspark.sql import SparkSession

spark = SparkSession.builder.appName("MSSQLReader").getOrCreate()

jdbc_url = "jdbc:sqlserver://127.0.0.1:1433;databaseName=speechs"
properties = {
    "user": "SA",
    "password": "Adriana@1396",
    "driver": "com.microsoft.sqlserver.jdbc.SQLServerDriver",
}
table_name = "grabbedText"
df = spark.read.jdbc(url=jdbc_url, table=table_name, properties=properties)
result = df.filter(df["polarity"] > 0).count()
print("total number of negative sentences:", result)

spark.stop()
