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
        res
          .status(404)
          .json({
            message: `No posts with the ID of ${req.params.id}. Please try another ID.`,
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
