const mongoCollections = require("../config/mongoCollections.js");
const patients = mongoCollections.patients_doctors;
let { ObjectId } = require("mongodb");

async function create(patientID, diseases_name, score) {
  if (typeof patientID === "undefined" || typeof patientID === "null")
    throw "Patient id is not defined";

  if (!diseases_name || !score) throw "Please provide all inputs";
  // if (diseases_name.trim() == "" || score.trim() == "")
  //   throw "Do not enter blank values";

  // let regexp = /\s/g;
  // if (!diseases_name.match(regexp) || !score.match(regexp))
  //   throw "Invalid input with spaces";

  // let regEx = /^[a-zA-Z]+$/;
  // if (!diseases_name.match(regEx)) throw "Please enter only string";

  // let reggg = /^\d*$/;
  // if (!score.match(reggg)) throw "Only numbers are allowed ";

  const patientscol = await patients();
  let objid = ObjectId(patientID);
  let doc = {
    _id: ObjectId(),
    disease_name: diseases_name,
    disease_score: parseInt(score),
  };
  const adddisease = await patientscol.updateOne(
    { _id: objid },
    { $push: { diseases: doc } }
  );

  const scor = await patientscol.updateOne({ _id: ObjectId(patientID) }, [
    { $set: { totalscore: { $sum: "$diseases.disease_score" } } },
  ]);

  let rest = await patientscol.findOne({ _id: objid });
  rest._id = rest._id.toString();
  for (let i = 0; i < rest.diseases.length; i++) {
    rest.diseases[i]._id = rest.diseases[i]._id.toString();
  }
  return true;
}
module.exports = {
  create,
};
