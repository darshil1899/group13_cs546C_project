const express = require("express");
const router = express.Router();
const data = require("../data/doctors");
const diseases = require("../data/disease");
const { restaurants } = require("../config/mongoCollections");
const connection = require("../config/mongoConnection");
const doclogin = require("../data/doctor_login");

router.get("/", async (req, res) => {
  if (req.session.user) {
    res.redirect("/doctorsusers/private");
    return;
  } else {
    res.render("patient/login");
  }
});

router.get("/main", async (req, res) => {
  try {
    res.status(200).render("patient/mainpage");
    return;
  } catch (e) {
    res.render("patient/error_book_patients", { error: e });
    return;
  }
});

router.post("/login", async (req, res) => {
  try {
    let ami = req.body.username;
    let prathu = req.body.password;
    ami = ami.toLowerCase();
    if (!ami) {
      let errors = "No username provided ";

      res.status(400).render("patient/login", {
        errors: "No username found!",
        hasErrors: true,
      });
      return;
    }
    if (!prathu) {
      let errors = "No password provided ";

      res.status(400).render("patient/login", {
        errors: "No password found!",
        hasErrors: true,
      });
      return;
    }
    if (ami.length < 4) {
      let errors = "The username should be at least 4 characters long";
      // todo
      res.status(400).render("patient/login", {
        errors: "The username should be at least 4 characters long",
        hasErrors: true,
      });
      return;
    }
    if (prathu.length < 6) {
      let errors = "The password  should be at least  6characters long";
      // todo
      res.status(400).render("patient/login", {
        errors: "The password  should be at least  6characters long",
        hasErrors: true,
      });
      return;
    }
    if (ami.trim() === "") {
      let errors = "empty input!";
      // todo
      res.status(400).render("patient/login", {
        errors: "Username cannot be empty!",
        hasErrors: true,
      });
      return;
    }
    if (prathu.trim() === "") {
      let errors = "empty input!";
      // todo
      res.status(400).render("patient/login", {
        errors: "Password cannot be empty ",
        hasErrors: true,
      });
      return;
    }
    if (!ami.match(/^[a-zA-Z]+$/)) {
      let errors = "not alphanumeric!";
      // todo
      res.status(400).render("patient/login", {
        errors: "Please enter only letters and numbers!",
        hasErrors: true,
      });
      return;
    }
    if (prathu.match(/\s/g)) {
      let errors = "empty spaces!";
      // todo
      res.status(400).render("patient/login", {
        errors: "Invalid password",
        hasErrors: true,
      });
      return;
    }
    const user = await doclogin.checkUser(ami, prathu);
    if (user.authenticated) {
      req.session.user = ami;
      res.redirect("/doctorsusers/private");
      return;
    }
  } catch {
    res.status(400).render("patient/login", {
      errors: "Either the username or password is invalid",
      hasErrors: true,
      noMatch: true,
    });
  }
});

router.post("/signup", async (req, res) => {
  let usersPostBody = req.body;
  if (!usersPostBody.username) {
    let errors = "No username provided ";
    res.status(400).render("patient/signup", {
      errors: "No username found!",
      hasErrors: true,
    });
    return;
  }
  if (!usersPostBody.password) {
    let errors = "No password provided ";
    res.status(400).render("patient/signup", {
      errors: "No password found!",
      hasErrors: true,
    });
    return;
  }
  if (usersPostBody.username.length < 4) {
    let errors = "The username should be  at least 4 characters long";

    res.status(400).render("patient/signup", {
      errors: "The username should be at least 4 characters long",
      hasErrors: true,
    });
    return;
  }
  if (usersPostBody.password.length < 6) {
    let errors = "The password should be  at least  6 characters long";

    res.status(400).render("patient/signup", {
      errors: "The password should be  at least  6 characters long",
      hasErrors: true,
    });
    return;
  }
  if (usersPostBody.username.trim() === "") {
    let errors = "empty input!";

    res.status(400).render("patient/signup", {
      errors: "Username cannot be empty!",
      hasErrors: true,
    });
    return;
  }
  if (usersPostBody.password.trim() === "") {
    let errors = "empty input!";

    res.status(400).render("patient/signup", {
      errors: "Password cannot be empty!",
      hasErrors: true,
    });
    return;
  }
  if (!usersPostBody.username.match(/^[a-zA-Z]+$/)) {
    let errors = "not alphanumeric!";

    res.status(400).render("patient/signup", {
      errors: "Please enter only letters and numbers!",
      hasErrors: true,
    });
    return;
  }
  if (usersPostBody.password.match(/\s/g)) {
    let errors = "empty spaces!";

    res.status(400).render("patient/signup", {
      errors: "Invalid password",
      hasErrors: true,
    });
    return;
  }
  try {
    const { username, password } = await usersPostBody;
    const newUser = await doclogin.create(username, password);

    if (newUser.userInserted) return res.redirect("/");
  } catch (e) {
    res.status(e.error || 500).render("patient/signup", {
      errors: e.message || "Internal Server Error",
      hasErrors: true,
      noMatch: true,
    });
  }
});

router.get("/logout", async (req, res) => {
  req.session.destroy();
  res.render("patient/logout");
  return;
});

router.get("/private", async (req, res) => {
  if (req.session.user) {
    return res.render("patient/register");
  }
});

router.get("/signup", async (req, res) => {
  if (req.session.user) {
    res.redirect("/doctorsusers/private");
    return;
  } else {
    res.render("patient/signup");
  }
});

module.exports = router;
