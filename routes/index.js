const DoctorRoutes = require("./doctors");
const DiseaseRoutes = require("./disease");
const userRoutes = require("./doctorsusers");
const mainRoutes = require("./main");
const routes = require("./users");

const constructorMethod = (app) => {
  app.use("/doctors", DoctorRoutes);
  app.use("/disease", DiseaseRoutes);
  app.use("/doctorsusers", userRoutes);
  app.use("/users", routes);
  app.use("/main", mainRoutes);
  app.use("/$", async (req, res) => {
    if (req.session.isDoctor) {
      res.redirect("doctors/view_patients");
      return;
    }
    res.redirect("/main");
    return;
  });
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
