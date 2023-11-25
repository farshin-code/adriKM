const jwt = require("jsonwebtoken");
require("dotenv").config();
function authorizationCheck(req, res, next) {
  let authorization = req.headers.authorization;
  console.log("authorization:", authorization);
  if (authorization) {
    jwt.verify(authorization, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        console.log("error is :", err);
        res.sendStatus(401).json({ error: "Invalid credentials" });
        res.end();
      } else {
        console.log("authorized:", decoded);

        next();
      }
    });
  } else {
    res.sendStatus(401).json({ error: "Invalid credentials" });
    res.end();
  }
}

module.exports = { authorizationCheck };
