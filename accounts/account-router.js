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

// GETS an account from the DB based on ID
router.get("/:id", (req, res) => {
  db("accounts")
    .where({
      id: req.params.id,
    })
    .first()
    .then((account) => {
      if (account) {
        res.status(200).json({ data: account });
      } else {
        res.status(404).json({
          message: `No posts with the ID of ${req.params.id}. Please try another ID.`,
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

// Posts a new account to the DB. The name and budget field are required.
router.post("/", (req, res) => {
  const account = req.body;
  if (isValidAccount(account)) {
    db("accounts")
      .insert(account, "id")
      .then((ids) => {
        res.status(201).json({ data: ids });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  } else {
    res.status(400).json({
      message: "Both name and budget are required. Please try again.",
    });
  }
});

// Makes a change to an existing account
router.put("/:id", (req, res) => {
  const changes = req.body;
  if (isValidAccount(changes)) {
    db("accounts")
      .where({ id: req.params.id })
      .update(changes)
      .then((count) => {
        if (count) {
          res
            .status(200)
            .json({ message: "The account was updated successfully." });
        } else {
          res.status(404).json({
            message: `No posts with the ID of ${req.params.id}. Please try another ID.`,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: error.message });
      });
  } else {
    res.status(400).json({
      message: "Both name and budget are required. Please try again.",
    });
  }
});

// Checks to see if all parts of data required to make a new post are included in the data
function isValidAccount(account) {
  return Boolean(account.name && account.budget);
}

module.exports = router;
