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
      "Darshil",
      "Shah",
      "08/01/1999",
      "Male",
      "123454343645",
      "Dss",
      "397"
    );
    abcd = darshil;
    console.log(abcd);
  } catch (e) {
    console.log(e);
  }

  // try {
  //   const doclogin = await doclo.create("dsss", "123456");
  //   console.log(doclogin);
  // } catch (e) {
  //   console.log(e);
  // }

  // try {
  //   const dise = await disea.create("61a51d4b800d6e723600b5c8", "Cancer", 33);
  //   console.log(dise);
  // } catch (e) {
  //   console.log(e);
  // }

  // try {
  //   const dise = await disea.create("61a51d4b800d6e723600b5c8", "Fever", 33);
  //   console.log(dise);
  // } catch (e) {
  //   console.log(e);
  // }
}

main();
