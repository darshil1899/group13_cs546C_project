const mongoCollections = require("../config/mongoCollections.js");
const patients_doctors = mongoCollections.patients_doctors;
const { ObjectId } = require("mongodb");

const collections = require("../config/mongoCollections");

async function create(
  firstname,
  lastname,
  dateOfBirth,
  sex,
  hospitalNumber,
  diseases,
  room
) {
  diseases = [];

  // writing our new object
  const newPatient = {
    firstname: firstname,
    lastname: lastname,
    dateOfBirth: dateOfBirth,
    sex: sex,
    hospitalNumber: hospitalNumber,
    diseases: diseases,
    room: room,
  };

  // Inserting our new object & returning it with the _id
  const PatientCollection = await patients_doctors();

  const insertPatient = await PatientCollection.insertOne(newPatient);

  if (insertPatient.insertedCount === 0) {
    throw `Sorry! Could not add ${newPatient}`;
  }

  const newId = insertPatient.insertedId.toString();

  return await get(newId);
}

async function get(id) {
  // check for errors
  if (id === undefined || id === null) throw "input id is not defined";

  if (typeof id === "string") {
    id = ObjectId(id);
  } else if (!(id instanceof ObjectId)) {
    throw "Invalid input id";
  }

  // to find by id & store in 'hospital'
  const PatientCollection = await patients_doctors();
  const Patient = await PatientCollection.findOne({ _id: id });

  if (Patient === null) {
    throw `No patient found with id: ${id} `;
  }
  Patient._id = Patient._id.toString();

  // to string the reviewObject._id
  if (Patient.diseases.length > 0) {
    for (let i in Patient.diseases) {
      Patient.diseases[i]._id = Patient.diseases[i]._id.toString();
    }
  }
  return Patient;
}

module.exports = {
  create,
  get,
};
