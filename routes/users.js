const { ObjectId } = require("bson");
const express = require("express");
const { users } = require("../config/mongoCollections");
const doctors = require("../data/doctors");
const router = express.Router();
const data = require("../data/users");
var xss = require("xss");

router.get("/", async (req, res) => {
  let reqSes = Object.keys(req.session);
  if (reqSes.includes("username")) {
    res.redirect("/users/patient1");
    return;
  } else {
    res.render("login1/login1");
    return;
  }
});

router.get("/search_doctors", async (req, res) => {
  res.render("search/search_doc");
  return;
});

router.post("/search_doctors", async (req, res) => {
  let searchTerm = req.body.searchterm;
  const searchResults = await doctors.searchDoctors(searchTerm);
  res.status(200).render("search/search_results", { searchResults });
  return;
});

router.post("/:id/add_patients_comment", async (req, res) => {
  try {
    req.params.id = xss(req.params.id);
    let appointmentId = req.params.id;
    const addAppComment = await data.addAppointmentComment(
      appointmentId,
      xss(req.body.comment),
      "patient"
    );
    if (addAppComment) {
      res.redirect("/users/view_my_appointments");
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(400).render("appointment/all_my_appointments", {
      error: "Something went wrong.",
    });
    return;
  }
});

router.post("/login1", async (req, res) => {
  try {
    if (xss(!req.body.username) || xss(!req.body.password)) {
      res.status(400).render("login1/login1", {
        error: "Username or Password is not provided ",
      });
      return;
    }
    const User = await data.checkUser(
      xss(req.body.username),
      xss(req.body.password)
    );

    if (User.authenticated) {
      // { authenticated: true, authenticatedUser: user }
      req.session.username = req.body.username.toLowerCase();
      req.session.userId = User.loggedinuser._id;
      req.session.useremail = User.loggedinuser.email;
      req.session.isDoctor = false;
      // req.session.userId = User.authenticatedUser._id.toString();
      res.redirect("/users/patient1");
      return;
    }
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .render("login1/login1", { error: "Username and password is not valid" });
    return;
  }
});

router.post("/signup1", async (req, res) => {
  try {
    const User = await data.createUser(
      xss(req.body.username),
      xss(req.body.password),
      xss(req.body.firstname),
      xss(req.body.lastname),
      xss(req.body.dateofbirth),
      xss(req.body.phonenumber),
      xss(req.body.email),
      xss(req.body.gender)
    );
    if (User.userInserted) {
      res.redirect("/users");
      return;
    }
  } catch (e) {
    res.status(400).render("signup1/signup1", { error: e });
    return;
  }
});

router.get("/signup1", async (req, res) => {
  let reqSes = Object.keys(req.session);
  if (reqSes.includes("username" || "firstname")) {
    res.redirect("/patient1");
    return;
  } else {
    res.render("signup1/signup1");
    return;
  }
});

router.get("/logout1", async (req, res) => {
  let reqSes = Object.keys(req.session);
  if (!reqSes.includes("username")) {
    res.redirect("/");
    return;
  }

  req.session.destroy();
  res.render("logout1/logout1");
});

router.post("/book", async (req, res) => {
  try {
    if (
      xss(!req.body.firstname) ||
      xss(!req.body.lastname) ||
      xss(!req.body.phonenumber) ||
      xss(!req.body.email)
    ) {
      res
        .status(400)
        .render("book/book", { error: "Values are not provided " });
      return;
    }
    const User = await data.checkUser(
      xss(req.body.username),
      xss(req.body.password)
    );

    req.session.username = xss(req.body.username.toLowerCase());
    if (User.authenticated) {
      res.redirect("/patient1");
      return;
    }
  } catch (e) {
    console.log(e);
    res
      .status(400)
      .render("login1/login1", { error: "Username and password is not valid" });
    return;
  }
});

router.get("/patient1", async (req, res) => {
  try {
    let sess = req.session;

    res.render("patient1/patient1");
    return;
  } catch (e) {
    console.log(e);
  }
});

router.get("/book", async (req, res) => {
  res.render("book/book", { username: req.session["username"] });
  return;
});

router.get("/profile", async (req, res) => {
  try {
    let userDetails = await data.get(req.session.userId);
    res.render("profile/profile", { user: userDetails });
    return;
  } catch (e) {
    console.log(e);
  }
});

router.post("/feedback", async (req, res) => {
  try {
    res.redirect("/feedback");
    return;
  } catch (e) {
    res.status(400).render("feedback/feedback", { error: e });
    return;
  }
});

router.post("/appointment", async (req, res) => {
  try {
    if (!req.body.firstname || !req.body.lastname) {
      res.status(400).render("book/book", {
        error: "Username or Password is not provided ",
      });
      return;
    }
    console.log(
      xss(req.body.firstname),
      xss(req.body.lastname),
      xss(req.body.dateofbirth),
      xss(req.body.gender),
      xss(req.body.email),
      xss(req.body.phonenumber),
      xss(req.body.doctor),
      xss(req.body.date),
      xss(req.body.time)
    );
    const appointmentvalue = await data.appointmentconf(
      xss(req.body.firstname),
      xss(req.body.lastname),
      xss(req.body.dateofbirth),
      xss(req.body.gender),
      xss(req.session.useremail),
      xss(req.body.phonenumber),
      xss(req.body.doctor),
      xss(req.body.date),
      xss(req.body.time)
    );

    console.log(appointmentvalue);
    res
      .status(200)
      .render("appointment/appointment", { appointment: appointmentvalue });
    return;
  } catch (e) {
    console.log(e);
    res.status(400).render("appointment/appointment", { error: "not booked" });
    return;
  }
});

router.get("/feedback", async (req, res) => {
  res.render("feedback/feedback", { username: req.session["username"] });
  return;
});

router.post("/reviews", async (req, res) => {
  try {
    res.redirect("/reviews");
    return;
  } catch (e) {
    res.status(400).render("reviews/reviews", { error: e });
    return;
  }
});

router.get("/koushal", async (req, res) => {
  res.render("koushal/koushal");
  return;
});

router.get("/inchara", async (req, res) => {
  res.render("inchara/inchara");
  return;
});

router.get("/ami", async (req, res) => {
  res.render("ami/ami");
  return;
});

router.get("/darhsil", async (req, res) => {
  res.render("darshil/darshil");
  return;
});

router.get("/saikrishna", async (req, res) => {
  res.render("saikrishna/saikrishna");
  return;
});

router.get("/hospital", async (req, res) => {
  res.render("hospital/hospital");
  return;
});

router.get("/update", async (req, res) => {
  let details = req.session.userId;
  let users = await data.get(details);
  res.render("update/update", { userId: users });
  return;
});

router.put("/edit/:id", async (req, res) => {
  let new_info = req.body;

  try {
    req.params.id = xss(req.params.id);
    await data.get(req.params.id);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  try {
    console.log(xss(req.body.username));
    console.log(xss(req.body.password));
    const newuser = await data.updateProfile(
      req.params.id,
      new_info.firstname,
      new_info.lastname,
      new_info.gender,

      new_info.phonenumber
    );

    if (newuser.updateInserted) {
      req.session.useremail = new_info.email;
      res.redirect("/users/profile");

      return;
    }
  } catch (e) {
    console.log(e);
    res.status(400).render("update/update", { error: e });
    return;
  }
});

router.get("/view_my_appointments", async (req, res) => {
  let email = req.session.useremail;
  const myAppointments = await data.getAppointmentByEmailAddress(email);

  res.render("appointment/all_my_appointments", { myAppointments });
});

<<<<<<< HEAD
module.exports = router;
=======
module.exports = router;
>>>>>>> Darshil
