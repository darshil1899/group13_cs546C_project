const express = require("express");
const router = express.Router();
const data = require("../data/doctors");
const diseases = require("../data/disease");
const { restaurants } = require("../config/mongoCollections");
const connection = require("../config/mongoConnection");
const doclogin = require("../data/doctor_login");

router.get("/", async (req, res) => {
  try {
    res.status(200).render("patient/mainpage");
    return;
  } catch (e) {
    res.render("patient/error_book_patients", { error: e });
    return;
  }
});

module.exports = router;
