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
  emailid
) {
  if (
    !firstname ||
    !lastname ||
    !dateOfBirth ||
    !sex ||
    !hospitalNumber ||
    !diseases ||
    !emailid
  )
    throw "Please enter a vaild input";

  if (
    firstname.trim() == "" ||
    lastname.trim() == "" ||
    hospitalNumber.trim() == "" ||
    emailid == ""
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
    emailid: emailid,
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
    for (let i = 0; i < Patient.diseases.length; i++) {
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
  if (allBookedPatients.length >= 2) {
    throw `No rooms available.`;
  }
  let dar = await PatientCollection.findOne({
    _id: new ObjectId(id),
  });

  const Patient = await PatientCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { roomBooked: !dar.roomBooked } }
  );
  return { roomBooked: !dar.roomBooked, patientId: id };
}

async function deletepat(id) {
  const patientCOl = await patients_doctors();
  let pat_id = ObjectId(id);

  const delPat = await patientCOl.deleteOne({ _id: pat_id });
  if (delPat.modifiedCount !== 0) {
    return true;
  } else throw "Could not delete patient";
}

// async function remove(id) {
//   let h;
//   let final = {};

//   let d;

//   const r = await patients_doctors();
//   const revieobj = await r.find({ "reviews._id": ObjectId(id) }).toArray();
//   let partirev;
//   for (let i = 0; i < revieobj.length; i++) {
//     partirev = revieobj[i].reviews;
//     let j = 0;
//     const partirevlen = partirev.length;
//     while (j < partirevlen) {
//       p = partirev[j]._id;
//       if (p.toString() === reviewId) {
//         h = revieobj[i]._id;
//       }
//       j++;
//     }
//   }
//   let t;
//   const restaurantt = await restaurants();
//   const resttt = await restaurantt.find({}).toArray();
//   for (i = 0; i < resttt.length; i++) {
//     a = resttt[i].reviews;
//     for (p = 0; p < a.length; p++) {
//       q = a[p]._id;
//       if (q == reviewId) {
//         t = resttt[i]._id;
//         rid = resttt[i]._id;
//       }
//     }

//     const obj = ObjectId(reviewId);
//     const di = await restaurants();
//     let rest = await di.find({ "reviews._id": ObjectId(reviewId) }).toArray();
//     const deletionInfo = await di.updateOne(
//       { _id: h },
//       { $pull: { reviews: { _id: obj } } }
//     );

//     if (rest.length === 0) {
//       const rate = await di.updateOne({ _id: rid }, [
//         { $set: { overallRating: 0 } },
//       ]);
//       throw `Could not delete review with id of ${reviewId}`;
//     } else {
//       const rate = await di.updateOne({ _id: rid }, [
//         { $set: { overallRating: { $avg: "$reviews.rating" } } },
//       ]);
//       final.reviewId = reviewId;
//       final.deleted = true;
//       return final;
//     }
//   }
//}

const searchDoctors = async (searchTerm) => {
  const doctorCollection = await collections.doctors();

  return await doctorCollection
    .find({ username: { $regex: searchTerm } })
    .toArray();
};

module.exports = {
  create,
  get,
  getAllPatients,
  bookRoom,
  deletepat,
  searchDoctors,
  // remove,
};
