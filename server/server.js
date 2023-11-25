const express = require("express");
const jwt = require("jsonwebtoken");
const { authorizationCheck } = require("./middleware");
const { consume, produce } = require("./kafkaProduceConsume");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("dotenv").config();

///middlewares for server

// add cors headers to allow cross-origin requests from everywhere we can change it to localhost or ...
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  next();
});
////////////

app.post("/getToken", (req, res) => {
  const username = req.body.username;
  console.log("username:", username);
  console.log("process.env.SECRET_KEY:", process.env.SECRET_KEY);
  jwt.sign({ username }, process.env.SECRET_KEY || "secret", (err, token) => {
    if (err) {
      console.log("error while generating token", err);
      res.sendStatus(500);
    }
    res.send({ token });
  });
});
app.post("/trigger", authorizationCheck, (req, res) => {
  const grabedText = req.body.grabedText;
  const user = req.body.user;
  produce(grabedText, user)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("error in produce:", error);
      res.sendStatus(500);
    });
});

app.listen(process.env.NODE_SERVER_PORT || 4211, () => {
  console.log(
    `server is running on port ${process.env.NODE_SERVER_PORT || 4211}`
  );
});
