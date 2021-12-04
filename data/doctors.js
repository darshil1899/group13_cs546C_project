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
  if (
    !firstname ||
    !lastname ||
    !dateOfBirth ||
    !sex ||
    !hospitalNumber ||
    !diseases ||
    !room
  )
    throw "Please enter a vaild input";

  if (
    firstname.trim() == "" ||
    lastname.trim() == "" ||
    hospitalNumber.trim() == "" ||
    room.trim() == ""
  )
    throw "Do not enter blank values";

  // let regexp = /\s/g;
  // if (!firstname.match(regexp) || !lastname.match(regexp))
  //   throw "Invalid input with spaces";

  // let regEx = /^[a-zA-Z]+$/;
  // if (!firstname.match(regEx) || !lastname.match(regEx))
  //   throw "Please enter only letters";

  // let reggg = /^\d*$/;
  // if (!hospitalNumber.match(reggg) || !room.match(reggg))
  //   throw "Only numbers are allowed ";

  let totalscore = 0;
  diseases[0]["_id"] = new ObjectId();
  const newPatient = {
    firstname: firstname,
    lastname: lastname,
    dateOfBirth: dateOfBirth,
    sex: sex,
    hospitalNumber: hospitalNumber,
    room: room,
    roomBooked: false,
    totalscore: diseases[0]["disease_score"],
    diseases: diseases,
  };

  const PatientCollection = await patients_doctors();
  let allUsers = await PatientCollection.find({}).toArray();
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].hospitalNumber == hospitalNumber) {
      throw {
        message: "There is already a patient with that Hopsital number",
        error: 400,
      };
    }
  }

  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].room == room) {
      throw {
        message: "The room is already occupied",
        error: 400,
      };
    }
  }
  const insertPatient = await PatientCollection.insertOne(newPatient);

  if (insertPatient.insertedCount === 0) {
    throw `Sorry! Could not add ${newPatient}`;
  }

  const newId = insertPatient.insertedId.toString();

  return await get(newId);
}

async function getAllPatients() {
  const PatientCollection = await patients_doctors();
  return await PatientCollection.find(
    {},
    {
      $projection: {
        firstname: 1,
        lastname: 1,
        hospitalNumber: 1,
        totalscore: 1,
      },
    }
  ).toArray();
}

async function get(id) {
  if (id === undefined || id === null) throw "Given id parameter is invalid";

  if (!ObjectId.isValid(id)) {
    throw `Invalid id parameter passed.`;
  }

  if (typeof id === "string") {
    id = ObjectId(id);
  } else if (!(id instanceof ObjectId)) {
    throw "Invalid input id";
  }

  const PatientCollection = await patients_doctors();
  const Patient = await PatientCollection.findOne({ _id: id });

  if (Patient === null) {
    throw `No patient found with id: ${id} `;
  }
  Patient._id = Patient._id.toString();

  if (Patient.diseases.length > 0) {
    for (let i in Patient.diseases) {
      Patient.diseases[i]._id = Patient.diseases[i]._id.toString();
    }
  }
  return Patient;
}

async function bookRoom(id) {
  const PatientCollection = await patients_doctors();
  const allBookedPatients = await PatientCollection.find({
    roomBooked: true,
  }).toArray();
  if (allBookedPatients.length >= 10) {
    throw `No rooms available.`;
  }
  const Patient = await PatientCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { roomBooked: true } }
  );
  return { roomBooked: true, patientId: id };
}

module.exports = {
  create,
  get,
  getAllPatients,
  bookRoom,
};
