const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const router = express.Router();
const database = "../../database.db";
const db = new sqlite3.Database(database);


router.get("/", (req, res) => {
  const { email, password } = req.body;

  console.log(email);
  console.log(password);
  // Check if the user exists in the database
  db.get(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, row) => {
      if (err) {
        console.log("Internal server error first");
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (row) {
        console.log("Login successful");
        const ret = res.status(200).json({ message: "Login successful" });
        console.log(ret.statusCode);
        return ret;
      } else {
        console.log("INvalid username or password");
        return res.status(401).json({ error: "Invalid username or password" });
      }
    }
  );
});

module.exports = router;
