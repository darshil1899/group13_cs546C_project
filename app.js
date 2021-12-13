const express = require("express");
const app = express();
const configRoutes = require("./routes");
const static = express.static(__dirname + "/public");
const exphbs = require("express-handlebars");
const session = require("express-session");

const handlebarsInstance = exphbs.create({
  defaultLayout: "main",
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === "number")
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
      return new Handlebars.SafeString(JSON.stringify(obj));
    },
  },
});

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthCookie",
    secret: "some  secret  string!",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/doctors/view_patient/:id", async (req, res, next) => {
  if (req.body._method === "PUT") {
    req.method = "PUT";
  }
  console.log(req.method);
  next();
});

app.use("/private", (req, res, next) => {
  if (!req.session.user) {
    return res
      .status(403)
      .render("patient/loginError", { error: "Please LogIn" });
  } else {
    next();
  }
});

// app.use("/users", (req, res, next) => {
//   if (req.session.user) {
//     return res.redirect("/users/patient1");
//   } else {
//     next();
//   }
// });

// app.use("/users/book", (req, res, next) => {
//   if (!req.session.user) {
//     return res.redirect("/users/");
//   } else {
//     next();
//   }
// });

// app.use("/users", async (req, res) => {
//   if (req.session.username) res.redirect("/private");
//   return;
// });

// app.use("/doctorsusers", async (req, res) => {
//   if (req.session.username) res.redirect("/private");
//   return;
// });

app.use("/users/edit/:id", async (req, res, next) => {
  if (req.body._method === "PUT") req.method = "PUT";
  next();
});

let logMiddleware = function (req, res, next) {
  let CurrenttimeStamp = new Date().toUTCString();

  let RequestMethod = req.method;

  let RequestRoute = req.originalUrl;
  if (!req.session.user) {
    console.log(
      "[" +
        CurrenttimeStamp +
        "]: " +
        RequestMethod +
        " " +
        RequestRoute +
        " Non-Authenticated User"
    );
  } else {
    console.log(
      "[" +
        CurrenttimeStamp +
        "]: " +
        RequestMethod +
        " " +
        RequestRoute +
        " Authenticated User"
    );
  }

  next();
};

app.use(logMiddleware);
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});
