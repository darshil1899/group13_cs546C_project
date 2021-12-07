const DoctorRoutes = require("./doctors");
const DiseaseRoutes = require("./disease");
const routes = require('./users');


const constructorMethod = (app) => {
  app.use("/doctors", DoctorRoutes);
  app.use("/disease", DiseaseRoutes);
  app.use('/', routes);
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
