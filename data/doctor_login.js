const mongoCollections = require("../config/mongoCollections.js");
const doctors = mongoCollections.doctors;
const { ObjectId } = require("mongodb");

const collections = require("../config/mongoCollections");

async function create(username, password) {
  const newPatient = {
    username: username,
    password: password,
  };

  const PatientCollection = await doctors();
  const insertPatient = await PatientCollection.insertOne(newPatient);
  if (insertPatient.insertedCount === 0) {
    throw `Sorry! Could not add ${newPatient}`;
  }

  return { inserted: true };
}

module.exports = {
  create,
};
