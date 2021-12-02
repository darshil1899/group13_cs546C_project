const mongoCollections = require("../config/mongoCollections.js");
const patients = mongoCollections.patients_doctors;
let { ObjectId } = require("mongodb");

async function create(patientID, diseases_name, score) {
  const patientscol = await patients();
  let objid = ObjectId(patientID);
  let doc = {
    _id: ObjectId(),
    diseases_name: diseases_name,
    score: parseInt(score),
  };
  const adddisease = await patientscol.updateOne(
    { _id: objid },
    { $push: { diseases: doc } }
  );

  const scor = await patientscol.updateOne({ _id: ObjectId(patientID) }, [
    { $set: { totalscore: { $sum: "$diseases.score" } } },
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
