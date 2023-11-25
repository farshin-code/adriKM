from flask import Flask, request, jsonify
import spacy
from spacytextblob.spacytextblob import SpacyTextBlob
from SqlSrv import insertIntoDatabase
from datetime import datetime

nlp = spacy.load("en_core_web_sm")
nlp.add_pipe("spacytextblob")


app = Flask(__name__)


@app.route("/sentiment", methods=["POST"])
def sentiment():
    data = request.get_json()
    data = data["text"]
    userName = data.split(" *:* ")[0]
    text = data.split(" *:* ")[1]
    doc = nlp(text)
    polarity = doc._.polarity
    subjectivity = doc._.subjectivity
    insertIntoDatabase(
        text,
        userName,
        datetime.now().date(),
        polarity,
        subjectivity,
    )
    response = {
        "userName": userName,
        "text": text,
        "polarity": polarity,
        "subjectivity": subjectivity,
    }
    return jsonify(response), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
