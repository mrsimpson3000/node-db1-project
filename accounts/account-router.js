const express = require("express");

const db = require("../data/dbConfig.js");

const router = express.Router();

// GETS a list of all accounts from the DB
router.get("/", (req, res) => {
  db.select("*")
    .from("accounts")
    .then((accounts) => {
      res.status(200).json({ data: accounts });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: error.message });
    });
});

module.exports = router;
