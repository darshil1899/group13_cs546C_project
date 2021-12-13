const mongoCollections = require("../config/mongoCollections.js");
const doctors = mongoCollections.doctors;
const { ObjectId } = require("mongodb");
const collections = require("../config/mongoCollections");
const bcrypt = require("bcrypt");
const saltRounds = 10;

async function create(username, password, rating = 0) {
  if (!username) throw "Provide username";
  if (!password) throw "provide password";
  if (username.length < 4) throw "the username  at least 4 characters long";
  if (password.length < 6) throw "the username  at least 4 characters long";
  if (username.trim() == "") throw "Username cannot be empty";
  if (password.trim() == "") throw "password cannot be empty";
  let regEx = /^[a-zA-Z]+$/;
  if (!username.match(regEx)) throw "Please enter letters and numbers only";
  let regexp = /\s/g;
  if (password.match(regexp)) throw "Invalid password";
  username = username.toLowerCase();
  const hash = await bcrypt.hash(password, saltRounds);
  const newUser = {
    username: username,
    password: hash,
    rating: rating,
  };
  const userCollection = await doctors();
  let allUsers = await userCollection.find({}).toArray();
  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].username == username) {
      throw {
        message: "There is already a user with that username",
        error: 400,
      };
    }
  }
  const insertUser = await userCollection.insertOne(newUser);
  if (insertUser.insertedCount === 0) {
    throw `Sorry! Could not add ${newUser}`;
  }
  return { userInserted: true };
}
async function checkUser(username, password) {
  if (!username) throw "Provide username";
  if (!password) throw "provide password";
  if (username.length < 4) throw "the username  at least 4 characters long";
  if (password.length < 6) throw "the username  at least 4 characters long";
  if (username.trim() == "") throw "Username cannot be empty";
  if (password.trim() == "") throw "password cannot be empty";
  let regEx = /^[a-zA-Z]+$/;
  if (!username.match(regEx)) throw "Please enter letters and numbers only";
  let regexp = /\s/g;
  if (password.match(regexp)) throw "Invalid password";
  let compareTomatch = false;
  const userCollection = await doctors();
  let user = await userCollection.findOne({ username: username });
  if (!user) throw `No user found wiht that username.`;
  compareTomatch = await bcrypt.compare(password, user.password);
  if (compareTomatch) {
    return {
      authenticated: true,
      loggedinuser: await userCollection.findOne({ username: username }),
    };
  } else {
    return {
      authenticated: false,
    };
  }
}
module.exports = {
  create,
  checkUser,
};
