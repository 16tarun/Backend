<<<<<<< HEAD
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const router = express.Router();
const database = "../../database.db";
const db = new sqlite3.Database(database);

// Create a users table if not exists
db.serialize(() => {
  db.run(
    "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, email TEXT, password TEXT)"
  );
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Login endpoint
router.post("/", (req, res) => {
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
=======
const express = require('express');
const router = express.Router();
const UserModel = require('../Model/Users');
const jwt = require('jsonwebtoken');

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await UserModel.findOne({ email, password });
    if (!existingUser) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // const passwordMatch = await existingUser.comparePassword(password);
    // if (!passwordMatch) {
    //   return res.status(401).json({ error: 'Invalid credentials' });
    // }

    const token = jwt.sign({ userId: existingUser._id }, 'yourSecretKey');

    const data = { token, userInfo: existingUser }; 
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
>>>>>>> a6f3445383beec9b6af59cd5e4e9badc3da3fd1e
