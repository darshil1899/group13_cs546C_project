const express = require("express");
const router = express.Router();
const data = require("../data/doctors");
const diseases = require("../data/disease");
const { restaurants } = require("../config/mongoCollections");
const connection = require("../config/mongoConnection");
const doclogin = require("../data/doctor_login");
var nodemailer = require("nodemailer");
const xss = require("xss");
// --------------------------------------------------------------------------------//

router.get("/view_patient/:id", async (req, res) => {
  try {
    
    if (!req.session.isDoctor) {
      res.redirect("/main");
      return;
    }
    let userId = xss(req.params.id);
    const patient = await data.get(userId);
   
    res.status(200).render("patient/view_single_patient", { patient });
    return;
  } catch (e) {
    console.log(e);
    res.render("patient/view_all_patients", { error: e });
    return;
  }
});

router.post("/view_patient/:id/bookRoom", async (req, res) => {
  try {
    const book = await data.bookRoom(xss(req.params.id));
    res.redirect(`/doctors/view_patient/${req.params.id}`);
    return;
    // if (book.roomBooked) {
    //   res.redirect(`/doctors/view_patient/${req.params.id}`);
    //   return;
    // }
  } catch (e) {
    res.render("patient/error_book_patients", { error: e });
    return;
  }
});

router.put("/view_patient/:id", async (req, res) => {
  if (xss(!req.body.diseasename)) {
    let errors = "No disease name is provided ";
    res.status(400).render("patient/view_single_patient", {
      errors: "No disease name is provided !",
      hasErrors: true,
    });
    return;
  }
  if (xss(!req.body.diseasescore)) {
    let errors = "No disease score is provided ";
    res.status(400).render("patient/view_single_patient", {
      errors: "No disease score is provided !",
      hasErrors: true,
    });
    return;
  }

  if (xss(req.body.diseasename.trim() == "")) {
    let errors = "Do not enter blank values ";
    res.status(400).render("patient/view_single_patient", {
      errors: "Do not enter blank values !",
      hasErrors: true,
    });
    return;
  }

  if (xss(req.body.diseasescore.trim() == "")) {
    let errors = "Do not enter blank values ";
    res.status(400).render("patient/view_single_patient", {
      errors: "Do not enter blank values !",
      hasErrors: true,
    });
    return;
  }

  // if (req.body.diseasename.match(/\s/g)) {
  //   let errors = "Invalid input with spaces ";
  //   res.status(400).render("patient/view_single_patient", {
  //     errors: "Invalid input with spaces !",
  //     hasErrors: true,
  //   });
  //   return;
  // }

  // if (req.body.diseasescore.match(/\s/g)) {
  //   let errors = "Invalid input with spaces ";
  //   res.status(400).render("patient/view_single_patient", {
  //     errors: "Invalid input with spaces !",
  //     hasErrors: true,
  //   });
  //   return;
  // }

  // if (req.body.diseasename.match(/^[a-zA-Z]+$/)) {
  //   let errors = "Please enter only letters";
  //   res.status(400).render("patient/view_single_patient", {
  //     errors: "Please enter only letters !",
  //     hasErrors: true,
  //   });
  //   return;
  // }

  // if (req.body.diseasescore.match(/^\d*$/)) {
  //   let errors = "Only numbers are allowed ";
  //   res.status(400).render("patient/view_single_patient", {
  //     errors: "Only numbers are allowed !",
  //     hasErrors: true,
  //   });
  //   return;
  // }

  try {
    req.params.id = xss(req.params.id);
    const updatedDiseases = await diseases.create(
      req.params.id,
      xss(req.body.diseasename),
      xss(req.body.diseasescore)
    );
    if (updatedDiseases) {
      res.redirect("/doctors/view_patients");
      return;
    }
  } catch (e) {
    res.status(500).render("patient/view_single_patient", {
      errors: "Internal Server Error",
      hasErrors: true,
      noMatch: true,
    });
  }
});

router.get("/view_patients", async (req, res) => {
  const allPatients = await data.getAllPatients();
  allPatients.reverse();
  res
    .status(200)
    .render("patient/view_all_patients", { patients: allPatients });
  return;
});

// router.get("/register_patient", async (req, res) => {
//   res.render("patient/register");
//   return;
// });

router.get("/register_patient", async (req, res) => {
  res.render("patient/register");
  return;
});

router.post("/register_patient", async (req, res) => {
  let payload = req.body;
  if (!payload.firstname) {
    let errors = "No firstname is provided";
    res.status(400).render("patient/register", {
      errors: "No firstname is provided!",
      hasErrors: true,
    });
    return;
  }

  if (!payload.lastname) {
    let errors = "No lastname is provided ";
    res.status(400).render("patient/register", {
      errors: "No lastname is provided !",
      hasErrors: true,
    });
    return;
  }

  if (!payload.lastname) {
    let errors = "No lastname is provided ";
    res.status(400).render("patient/register", {
      errors: "No lastname is provided !",
      hasErrors: true,
    });
    return;
  }

  if (!payload.patientuniquenumber) {
    let errors = "No patient unique number is provided ";
    res.status(400).render("patient/register", {
      errors: "No patient unique number is provided !",
      hasErrors: true,
    });
    return;
  }

  // if (!payload.roomnumber) {
  //   let errors = "No room number is provided ";
  //   res.status(400).render("patient/register", {
  //     errors: "No room number is provided !",
  //     hasErrors: true,
  //   });
  //   return;
  // }

  // if (payload.firstname.trim() == "") {
  //   let errors = "Empty spaces ";
  //   res.status(400).render("patient/register", {
  //     errors: "First name cannot be empty!",
  //     hasErrors: true,
  //   });
  //   return;
  // }

  // if (payload.lastname.trim() == "") {
  //   let errors = "Empty spaces ";
  //   res.status(400).render("patient/register", {
  //     errors: "Last name cannot be empty!",
  //     hasErrors: true,
  //   });
  //   return;
  // }

  if (payload.patientuniquenumber.trim() == "") {
    let errors = "Patient number cannot be empty ";
    res.status(400).render("patient/register", {
      errors: "Patient number cannot be empty!",
      hasErrors: true,
    });
    return;
  }

  if (payload.firstname.trim() == "") {
    let errors = "Room number cannot be empty ";
    res.status(400).render("patient/register", {
      errors: "Room number cannot be empty!",
      hasErrors: true,
    });
    return;
  }

  // if (!payload.firstname.match(/\s/g)) {
  //   let errors = "First name cannot be empty ";
  //   res.status(400).render("patient/register", {
  //     errors: "First name cannot be empty!",
  //     hasErrors: true,
  //   });
  //   return;
  // }

  // if (!payload.lastname.match(/\s/g)) {
  //   let errors = "Last name cannot be empty ";
  //   res.status(400).render("patient/register", {
  //     errors: "Last name cannot be empty!",
  //     hasErrors: true,
  //   });
  //   return;
  // }

  if (!payload.firstname.match(/^[a-zA-Z]+$/)) {
    let errors = "Please enter only letters ";
    res.status(400).render("patient/register", {
      errors: "Please enter only letters!",
      hasErrors: true,
    });
    return;
  }

  if (!payload.lastname.match(/^[a-zA-Z]+$/)) {
    let errors = "Please enter only letters ";
    res.status(400).render("patient/register", {
      errors: "Please enter only letters!",
      hasErrors: true,
    });
    return;
  }

  if (!payload.patientuniquenumber.match(/^\d*$/)) {
    let errors = "Please enter only numbers ";
    res.status(400).render("patient/register", {
      errors: "Please enter only numbers!",
      hasErrors: true,
    });
    return;
  }

  // if (!payload.roomnumber.match(/^\d*$/)) {
  //   let errors = "Please enter only numbers ";
  //   res.status(400).render("patient/register", {
  //     errors: "Please enter only numbers!",
  //     hasErrors: true,
  //   });
  //   return;
  // }

  let diseases = [];
  diseases.push({
    disease_name: xss(req.body.diseasename),
    disease_score: parseInt(xss(req.body.diseasescore)),
  });

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hopsitalmanagmentsystemcs546@gmail.com",
      pass: "Sanju@123",
    },
  });

  var mailOptions = {
    from: "hopsitalmanagmentsystemcs546@gmail.com",
    to: payload.emailid,
    subject: "Sending Email as confirmation",
    text: "You have been successfully admited in our hopsital. Thank you for giving us the chance to serve you. We hope you get well soon. ! ",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  try {
    const patient = await data.create(
      payload.firstname,
      payload.lastname,
      payload.dateofbirth,
      payload.sex,
      payload.patientuniquenumber,
      diseases,
      payload.emailid
    );

    if (patient) {
      res.redirect("/doctors/view_patients");
      return;
    }
  } catch (e) {
    console.log(e);
    res.status(e.error || 500).render("patient/register", {
      errors: e.message || "Internal Server Error",
      hasErrors: true,
      noMatch: true,
    });
  }
});

router.post("/delete/:id", async (req, res) => {
  try {
    req.params.id = xss(req.params.id);
    let pat_id = req.params.id;
    console.log(pat_id);
    const deletedPat = await data.deletepat(pat_id);
    if (deletedPat == true) {
      console.log("DELETED");
      return res.redirect("/doctors/view_patients");
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
