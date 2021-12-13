const { ObjectId } = require("bson");
const bcryptjs = require("bcryptjs");
const saltRounds = 5;
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const appointments = mongoCollections.appointments;

module.exports = {
  async createUser(
    username,
    password,
    firstname,
    lastname,
    dateofbirth,
    phonenumber,
    email,
    gender
  ) {
    //     if (typeof username !== 'string'|| typeof password !== 'string')
    //     {
    //         throw 'username should be a string';
    //     }
    //     if (username.length === 0 || password.length === 0 || lastname.length==0 ||dateofbirth.length==0 || city.length==0 || phonenumber.length==0 ||email.length==0 || gender.length==0)
    //    {
    //         throw 'Value cannot be a empty string';
    //     }
    //     if (username.trim().length === 0)
    //     {
    //         throw 'username is with empty spaces';
    //     }
    //     if (/\s/.test(username))
    //     {
    //         throw 'username has white spaces';
    //     }
    //     if (/\s/.test(password))
    //     {
    //         throw 'password has white spaces';
    //     }
    //     if (username.length <= 3)
    //     {
    //         throw 'username should contain at least 4 characters';
    //     }
    //     if (password.length <= 5)
    //     {
    //         throw 'password should contain at least 6 characters';
    //     }
    //     let ptn = "^[a-zA-Z0-9]*$"
    //     if (username.match(ptn) === null) {
    //         throw 'username should contain only alphanumeric characters';
    //     }

    //     var phoneno = /^\d{10}$/;
    //     if(!phonenumber.match(phoneno)){
    //         throw "Put a valid phonenumbewr"
    //     }

    //     if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
    //         throw "put a valid date";

    //     var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    //     if(!email.match(validRegex)){
    //         throw "Put a valid mail id "
    //     }

    const userCollection = await users();
    const appointmentCollection = await appointments();
    const l_name = username.toLowerCase();
    console.log(password);
    const ha_pswrd = await bcryptjs.hash(password, saltRounds);
    let newUser = {
      firstname: firstname,
      lastname: lastname,
      dateofbirth: dateofbirth,
      username: l_name,
      password: ha_pswrd,
      email: email,
      phonenumber: phonenumber,
      gender: gender,
    };

    let same = await userCollection.findOne({ username: username });
    if (same !== null) throw "This username is already occupied";
    let insertInfo = userCollection.insertOne(newUser);
    if (insertInfo.insertedCount === 0) throw "User is not created";
    return { userInserted: true };
  },

  async get(id) {
    if (!id) throw "You must provide an id to search";
    if (typeof id !== "string") throw "id must be string";
    if (id.length === 0) throw "the id is empty";

    if (!ObjectId.isValid(id)) throw "You must provide a valid id";

    const obj_id = new ObjectId(id);
    const usersCollection = await users();
    const res = await usersCollection.findOne({ _id: new ObjectId(obj_id) });

    if (res === null) throw "No users with that id";

    return res;
  },

  async checkUser(username, password) {
    if (typeof username !== "string" || typeof password != "string") {
      throw "username and password should be a string";
    }
    if (username.length === 0 || password.length === 0) {
      throw "username and password  is empty";
    }
    if (username.trim().length === 0) {
      throw "username cannot be empty";
    }
    if (username.length <= 3) {
      throw "username should have atleast 4 characters";
    }
    if (password.length <= 5) {
      throw "password should have atleast 6 characters";
    }
    if (/\s/.test(username)) {
      throw "username has white spaces";
    }
    if (/\s/.test(password)) {
      throw "password has white spaces";
    }

    let ptn = "^[a-zA-Z0-9]*$";
    // let ptn = /^.*(?=.*\d)(?=.*[a-zA-Z]).*$/;
    if (username.match(ptn) == null) {
      throw "username should contain only alphanumeric characters";
    }

    const userCollection = await users();
    let name = await userCollection.findOne({ username: username });
    let compare = false;
    console.log(password, name.password);
    compare = await bcryptjs.compare(password, name.password);
    console.log(compare);
    if (compare) return { authenticated: true, loggedinuser: name };
    else {
      throw "Invaild password or username";
    }
  },
  async updateProfile(id, firstname, lastname, gender, phonenumber) {
    // if(!(ObjectId.isValid(id)))
    //     throw 'You must provide a valid id'
    // if (username.length === 0 || lastname.length==0 ||dateofbirth.length==0 || city.length==0 || phonenumber.length==0 ||email.length==0 || gender.length==0)
    // {
    //     throw 'Value cannot be a empty string';
    // }

    // if (username.length <= 3)
    // {
    //     throw 'username should contain at least 4 characters';
    // }
    // if (password.length <= 5)
    // {
    //     throw 'password should contain at least 6 characters';
    // }
    // let ptn = "^[a-zA-Z0-9]*$"
    // if (username.match(ptn) === null) {
    //     throw 'username should contain only alphanumeric characters';
    // }

    // var phoneno = /^\d{10}$/;
    // if(!phonenumber.match(phoneno)){
    //     throw "Put a valid phonenumbewr"
    // }

    // if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
    //     throw "put a valid date";

    // var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // if(!email.match(validRegex)){
    //     throw "Put a valid mail id "
    // }

    const proInfo = await this.get(id);
    let proUpdate = {
      firstname: firstname,
      lastname: lastname,
      gender: gender,
      phonenumber: phonenumber,
    };

    const userCollection = await users();
    const proUpdateInfo = await userCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: proUpdate }
    );
    if (!proUpdateInfo.matchedCount && !proUpdateInfo.modifiedCount)
      throw "updation failed";
    return { updateInserted: true };
  },

  async appointmentconf(
    firstname,
    lastname,
    dateofbirth,
    gender,
    email,
    phonenumber,
    doctor,
    date,
    time
  ) {
    if (
      typeof firstname !== "string" ||
      typeof lastname !== "string" ||
      typeof dateofbirth !== "string" ||
      typeof gender !== "string" ||
      typeof email !== "string" ||
      typeof phonenumber !== "string" ||
      typeof doctor !== "string" ||
      typeof date !== "string" ||
      typeof time !== "string"
    ) {
      throw "Username should be a string";
    }
    if (
      !firstname ||
      !lastname ||
      !dateofbirth ||
      !email ||
      !phonenumber ||
      !gender ||
      !doctor ||
      !date ||
      !time
    )
      throw "provide a valid data";
    if (
      firstname.length === 0 ||
      lastname.length === 0 ||
      email.length === 0 ||
      phonenumber.length === 0 ||
      date.length === 0 ||
      doctor.length === 0 ||
      dateofbirth.length === 0
    ) {
      throw "Username and password cannot be a empty string";
    }
    // if (firstname.trim().length === 0) {
    //   throw "firstname cannot have empty spaces";
    // }
    // if (/\s/.test(firstname)) {
    //   throw "firstname cannot have white spaces";
    // }
    // if (lastname.trim().length === 0) {
    //   throw "lastname cannot have empty spaces";
    // }
    // if (/\s/.test(lastname)) {
    //   throw "lastname cannot have white spaces";
    // }
    // if (email.trim().length === 0) {
    //   throw "email cannot have empty spaces";
    // }
    // if (/\s/.test(email)) {
    //   throw "email cannot have white spaces";
    // }
    // if (phonenumber.trim().length === 0) {
    //   throw "phonenumber cannot have empty spaces";
    // }
    // if (/\s/.test(phonenumber)) {
    //   throw "phonenumber cannot have white spaces";
    // }
    // if (firstname.length < 4) {
    //   throw "firstname should contain at least 4 characters";
    // }
    // if (lastname.length < 4) {
    //   throw "lastname should contain at least 4 characters";
    // }
    // if (phonenumber.length < 10) {
    //   throw "password should contain  10 characters";
    // }
    // // let ptn = "^[a-zA-Z0-9]*$";
    // // if (username.match(ptn) === null) {
    // //   throw "username should contain only alphanumeric characters";
    // // }

    // var validRegex =
    //   /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // if (!email.match(validRegex)) {
    //   throw "Put a valid mail id ";
    // }

    const appointmentCollection = await appointments();
    let newUser = {
      firstname: firstname,
      lastname: lastname,
      dateofbirth: dateofbirth,
      gender: gender,
      email: email,
      phonenumber: phonenumber,
      problem: doctor,
      date: date,
      time: time,
      comments: [],
    };

    let insertInfo = await appointmentCollection.insertOne(newUser);
    let aid = insertInfo.insertedId;

    let appointmentdata = await appointmentCollection.findOne({ _id: aid });
    return appointmentdata;
  },

  async getAppointmentByEmailAddress(emailAddress) {
    const appointmentCollection = await appointments();
    const allMyAppointments = await appointmentCollection
      .find({ email: emailAddress })
      .toArray();
    return allMyAppointments;
  },

  async addAppointmentComment(appointmentId, comment, flag) {
    const commenter = flag === "doctor" ? true : false;
    const appointmentCollection = await appointments();
    const userToInsert = {
      byDoctor: commenter,
      comment: comment,
    };
    const addComment = await appointmentCollection.updateOne(
      {
        _id: new ObjectId(appointmentId),
      },
      {
        $addToSet: { comments: userToInsert },
      }
    );
    return true;
  },

  async getAllAppointments() {
    const appointmentCollection = await appointments();
    return await appointmentCollection.find({}).toArray();
  },
};
