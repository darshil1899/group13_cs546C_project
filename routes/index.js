const DoctorRoutes = require("./doctors");
const DiseaseRoutes = require("./disease");


const constructorMethod = (app) => {
  app.use("/doctors", DoctorRoutes);
  app.use("/disease", DiseaseRoutes);
 
  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
