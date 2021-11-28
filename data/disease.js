const mongoCollections = require("../config/mongoCollections.js");
const doctors = mongoCollections.doctors;
let { ObjectId } = require("mongodb");

async function create(patientID, diseases_name, score) {
  const insertrest = await doctors();

  let id = ObjectId();
  let newrev = {
    _id: id,
    diseases_name: diseases_name,
    score: score,
  };
  let restId = ObjectId(patientID);

  const restidd = ObjectId(patientID);
  const insertinfo = await insertrest.updateOne(
    { _id: restidd },
    { $addToSet: { diseases: newrev } }
  );
  const restCollection = await doctors();
  //const x = await restCollection.findOne({ _id: restId });

  // // let y = x.diseases;

  // // const rate = await insertrest.updateOne({ _id: ObjectId(patientID) }, [
  // //   { $set: { score: { $avg: "$diseases.score" } } },
  // // ]);

  const t = await restCollection.findOne({ _id: restId });

  t._id = t._id.toString();
  d = t.diseases;
  for (f = 0; f < d.length; f++) {
    d[f]._id = d[f]._id.toString();
  }
  return t;
}
module.exports = {
  create,
};
