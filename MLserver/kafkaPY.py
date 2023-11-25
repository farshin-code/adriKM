from kafka import KafkaConsumer
import requests

consumer = KafkaConsumer(
    "grabbed-text", group_id="Text-analayzer", bootstrap_servers=["localhost:9092"]
)
for message in consumer:
    print(message.value)
    resoponse = requests.post(
        "http://127.0.0.1:5000/sentiment",
        json={"text": message.value.decode("utf-8")},
    )
    if resoponse.status_code == 200:
        print(resoponse.json())
    else:
        print("Error interperting Text with MLserver API")
