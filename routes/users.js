const { ObjectId } = require("bson");
const express = require("express");
const { users } = require("../config/mongoCollections");
const router = express.Router();
const data = require("../data/users");

router.get("/", async (req, res) => {
  let reqSes = Object.keys(req.session);
  if (reqSes.includes("username")) {
    res.redirect("/patient1");
    return;
  } else {
    res.render("login1/login1");
    return;
  }
});

router.post("/login1", async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      res.status(400).render("login1/login1", {
        error: "Username or Password is not provided ",
      });
      return;
    }
    const User = await data.checkUser(req.body.username, req.body.password);
    // console.log(User);
    if (User.authenticated) {
      // { authenticated: true, authenticatedUser: user }
      req.session.username = req.body.username.toLowerCase();
      req.session.userId = User.loggedinuser._id;
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
      req.body.username,
      req.body.password,
      req.body.firstname,
      req.body.lastname,
      req.body.dateofbirth,
      req.body.phonenumber,
      req.body.email,
      req.body.gender
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
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.phonenumber ||
      !req.body.email
    ) {
      res
        .status(400)
        .render("book/book", { error: "Values are not provided " });
      return;
    }
    const User = await data.checkUser(req.body.username, req.body.password);
    console.log(User);
    req.session.username = req.body.username.toLowerCase();
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

router.post("/users/appointment", async (req, res) => {
  try {
    if (!req.body.firstname || !req.body.lastname) {
      res.status(400).render("book/book", {
        error: "Username or Password is not provided ",
      });
      return;
    }
    const appointmentvalue = await data.appointmentconf(
      req.body.firstname,
      req.body.lastname,
      req.body.dateofbirth,
      req.body.gender,
      req.body.email,
      req.body.phonenumber,
      req.body.problem,
      req.body.doctor,
      req.body.date,
      req.body.time
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

  // if(!new_info){
  //     res.status(400).render("update/update",{"error":"Must provide every details"})
  //     return;
  // }

  // if(!new_info.firstname){
  //     res.status(400).render("update/update",{"error":"Must provide every details"})
  //     return;
  // }

  // if(!new_info.lastname){
  //     res.status(400).render("update/update",{"error":"Must provide every details"})
  //     return;
  // }

  // if(!new_info.username){
  //     res.status(400).render("update/update",{"error":"Must provide every details"})
  //     return;
  // }
  // if(!new_info.email){
  //     res.status(400).render("update/update",{"error":"Must provide every details"})
  //     return;
  // }
  // if(!new_info.city){
  //     res.status(400).render("update/update",{"error":"Must provide every details"})
  //     return;
  // }
  // if(!new_info.gender){
  //     res.status(400).render("update/update",{"error":"Must provide every details"})
  //     return;
  // }
  // if(!new_info.phonenumber){
  //     res.status(400).render("update/update",{"error":"Must provide every details"})
  //     return;
  // }
  // if(!new_info.dateofbirth){
  //     res.status(400).render("update/update",{"error":"Must provide every details"})
  //     return;
  // }

  try {
    await data.get(req.params.id);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  try {
    console.log(req.body.username);
    console.log(req.body.password);
    const newuser = await data.updateProfile(
      req.params.id,
      new_info.firstname,
      new_info.lastname,
      new_info.gender,
      new_info.email,
      new_info.phonenumber
    );
    console.log(newuser);
    if (newuser.updateInserted) {
      res.redirect("/profile");
      console.log("edit//");
      return;
    }
  } catch (e) {
    res.status(400).render("update/update", { error: e });
    return;
  }
});

module.exports = router;
