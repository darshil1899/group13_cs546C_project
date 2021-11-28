const restaurants = require("./data/doctors");
const doclo = require("./data/doctor_login");
const disea = require("./data/disease");
const connection = require("./config/mongoConnection");
const { patients_doctors } = require("./config/mongoCollections");
const { doctors } = require("./config/mongoCollections");

async function main() {
  let abcd;
  let secon;
  try {
    const darshil = await restaurants.create(
      "arshil",
      "Shah",
      "08/01/1999",
      "Male",
      "123456",
      "Dss",
      3
    );
    abcd = darshil;
    // console.log(abcd._id);
    console.log(abcd);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("dsss", "123456");
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const dise = await disea.create(abcd._id.toString(), "Cancer", 33);
    console.log(dise);
  } catch (e) {
    console.log(e);
  }
}

main();
