const restaurants = require("./data/doctors");
const doclo = require("./data/doctor_login");
const disea = require("./data/disease");
const dar=require("./data/users")
const connection = require("./config/mongoConnection");
const { patients_doctors } = require("./config/mongoCollections");
const { doctors } = require("./config/mongoCollections");


async function main() {
  try {
    const doclogin = await doclo.create("darshittl", "123456", 3.4);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("Amir", "123456", 4);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("koushal", "123456" , 2.4);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("inchara", "123456", 3.1);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("saikrishna", "123456" , 2.7);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("meet", "123456", 3);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("pallavi", "123456" , 4);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("prajay", "123456" , 1.2);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("priya", "123456", 2.6);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("patrick", "123456", 3.9);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("vidhushi", "123456",1.9);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("krishma", "123456",3.5);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("sanjay", "123456",2.6);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("megha", "123456",3.9);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("abhishek", "123456",2.9);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("prithvi", "123456",3.1);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("prathamnesh", "123456",2.9);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("henna", "123456",2.8);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }
  try {
    const doclogin = await doclo.create("yatin", "123456",3.2);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }

  try {
    const doclogin = await doclo.create("arvindanna", "123456",4);
    console.log(doclogin);
  } catch (e) {
    console.log(e);
  }






/--Register patient--//



  try {
    const darshil = await restaurants.create(
      "Darshil",
      "Shah",
      "08/01/1999",
      "Male",
      "12343311145",
      [
        {
          disease_name: "Fever",
          disease_score: 50,
        },
      ],
      "darshilshah1899@gmail.com",
      "397"
    );
    console.log("inserted:true");
  } catch (e) {
    console.log(e);
  }

  try {
    const ami = await restaurants.create(
      "Ami",
      "Shah",
      "09/01/1999",
      "Female",
      "123433115",
      [
        {
          disease_name: "Cancer",
          disease_score: 80,
        },
      ],
      "amidesai54@gmail.com",
      "39"
    );
    console.log("inserted:true");
  } catch (e) {
    console.log(e);
  }


  try {
    const koushal = await restaurants.create(
      "Koushal",
      "Shah",
      "09/05/1999",
      "Male",
      "1234321",
      [
        {
          disease_name: "Aids",
          disease_score: 90,
        },
      ],
      "koushalar@gmail.com",
      "30"
    );
    console.log("inserted:true");
  } catch (e) {
    console.log(e);
  }


  try {
    const saikrishna = await restaurants.create(
      "Saikrishna",
      "Shah",
      "09/09/1999",
      "Female",
      "1234320",
      [
        {
          disease_name: "Mental",
          disease_score: 98,
        },
        
      ],
      "saikrishna89@gmail.com",
      "70"
    );
    console.log("inserted:true");
  } catch (e) {
    console.log(e);
  }

  try {
    const patrick = await restaurants.create(
      "Patrick",
      "Hill",
      "09/09/1976",
      "Male",
      "10475175",
      [
        {
          disease_name: "Fever",
          disease_score: 65,
        },
      ],
      "patrickhill@gmail.com",
      "50"
    );
    console.log("inserted:true");
  } catch (e) {
    console.log(e);
  }

  try {
    const errisa = await restaurants.create(
      "Errisa",
      "Hill",
      "09/09/1876",
      "Male",
      "1047175",
      [
        {
          disease_name: "Blood Cancer",
          disease_score: 95,
        },
      ],
      "errisaterroli@gmail.com",
      "60"
    );
    console.log("inserted:true");
  } catch (e) {
    console.log(e);
  }



  -----Appointment---//

try {
    const dssa = await dar.createUser(
      "dshhaih",
      "123456",
      "Megha",
      "Shah",
      "2021-11-11",
      "9773143444",
      "darshilshah1899@gmail.com",
      "male",
    );
    console.log("inserted:true");
  } catch (e) {
    console.log(e);
  }


  try {
    const dssa = await dar.createUser(
      "dshah",
      "123456",
      "Darshil",
      "Shah",
      "2019-11-11",
      "9773143443",
      "darshilshah152@gmail.com",
      "male",
    );
    console.log("inserted:true");
  } catch (e) {
    console.log(e);
  }

  try {
    const dssa = await dar.createUser(
      "megha",
      "123456",
      "Sanjay",
      "Shah",
      "2019-11-11",
      "9773143444",
      "sshah3528@gmail.com",
      "female",
    );
    console.log("inserted:true");
  } catch (e) {
    console.log(e);
  }

  try {
    const dssa = await dar.createUser(
      "amiii",
      "123456",
      "Amiii",
      "Desai",
      "2018-11-11",
      "9773143444",
      "darshilshah192@gmail.com",
      "male",
    );
    console.log("inserted:true");
  } catch (e) {
    console.log(e);
  }

  try {
    const dssa = await dar.createUser(
      "dshghdfh",
      "123456",
      "Darshill",
      "Shahhh",
      "2017-11-10",
      "9773153444",
      "darshilshah1758@gmail.com",
      "female",
    );
    console.log("inserted:true");
  } catch (e) {
    console.log(e);
  }



  try {
    const dssa = await dar.appointmentconf(
      "Dil",
      "Shah",
      "2021-12-08",
      "male",
      "darshilshah1899@gmail.com",
      "9773153444",
      "Koushal Anitha Raja",
      "2021-12-15",
      "10:30AM"
    );
    console.log("inserted:true");
  } catch (e) {
    console.log(e);
  }


  try {
    const dssa = await dar.appointmentconf(
      "Dsrgsil",
      "Shah",
      "2021-12-08",
      "male",
      "darshilshfah1899@gmail.com",
      "9773153444",
      "Koushal Anitha Raja",
      "2021-12-15",
      "10:30AM"
    );
    console.log("inserted:true");
  } catch (e) {
    console.log(e);
  }


  try {
    const dssa = await dar.appointmentconf(
      "Dillsdl",
      "Shah",
      "2021-12-08",
      "male",
      "darshilshah1899@gmail.com",
      "9773153544",
      "Koushal Anitha Raja",
      "2021-12-15",
      "10:30AM"
    );
    console.log("inserted:true");
  } catch (e) {
    console.log(e);
  }

  try {
    const dssa = await dar.appointmentconf(
      "Disadl",
      "Shdsah",
      "2021-12-08",
      "male",
      "darshilshah1899@gmail.com",
      "9773153644",
      "Koushal Anitha Raja",
      "2021-12-15",
      "10:30AM"
    );
    console.log("inserted:true");
  } catch (e) {
    console.log(e);
  }



}

main();
