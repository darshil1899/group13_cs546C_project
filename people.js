const axios = require("axios");

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json"
  );
  return data;
}

async function getPersonById(id) {
  const a = await getPeople();
  if (typeof id !== "string") throw " Not a vaild output";
  if (!id) throw "Not vaild ouput  ";
  let pers;

  a.forEach((x) => {
    if (x.id === id) {
      pers = x;
    }
  });
  if (pers) {
    return pers;
  } else {
    throw "Person not found";
  }
}

async function sameStreet(streetName, streetSuffix) {
  let s = await getPeople();

  let d = [];
  if (streetName == undefined) throw "Input is not vaild";
  if (streetSuffix == undefined) throw "Input is not vaild";
  if (typeof streetName !== "string") throw "Input is not a vaild";
  if (typeof streetSuffix !== "string") throw "Input is not a vaild";

  let sn = streetName.charAt(0).toUpperCase() + streetName.slice(1);
  let ss = streetSuffix.charAt(0).toUpperCase() + streetSuffix.slice(1);

  let q = streetName.trim();
  let w = streetSuffix.trim();
  if (q.length == 0 || w.length == 0) throw "You have entered empty spaces";

  s.forEach((x) => {
    if (
      (x.address.home.street_name === sn &&
        x.address.home.street_suffix === ss) ||
      (x.address.work.street_name === sn && x.address.work.street_suffix === ss)
    ) {
      d.push(x);
    }
  });
  if (d.length < 2)
    throw (
      "Error since there are not at least two people that live or work on " +
      sn +
      " " +
      ss
    );
  return d;
}

async function manipulateSsn() {
  let r = Array.from(arguments);
  if (r.length > 0) throw "No arugments are allowed ";
  let a = await getPeople();
  let max = 0;
  let firstm, lastm;
  let first, last;

  let sum = 0;
  let average = 0;
  let count = 0;
  let ms = {};
  let min = Number.MAX_VALUE;
  a.forEach((x) => {
    let u = x.ssn.replace(/-|\s/g, "");
    let m = u.split("").sort().join("");
    parseInt(m);
    if (m > max) {
      max = m;
      firstm = x.first_name;
      lastm = x.last_name;
    }
    if (m < min) {
      min = m;
      first = x.first_name;
      last = x.last_name;
    }
    sum = sum + parseInt(m);

    count = count + 1;
  });

  average = Math.floor(sum / count);
  (ms["highest"] = { firstName: firstm, lastName: lastm }),
    (ms["lowest"] = { firstName: first, lastName: last }),
    (ms["average"] = { average });
  return ms;
}

async function sameBirthday(month, day) {
  let a = await getPeople();
  let d;
  let u, m;
  let f;
  let dss;
  let smd;
  let str;
  let mo, da;
  let c = [];

  if (!month || !day) throw "Input is missing";
  if (month == undefined || day === undefined) throw "Not a viald input";
  if (typeof month != "number" || typeof day != "number")
    throw "Input you have entered is not a num type";
  let q = month.trim();
  let w = day.trim();
  if (q.length == 0 || w.length == 0) throw "You have entered empty spaces";
  mo = parseInt(month);
  if (month < 1 || month > 12) throw "Month > 12 not vaild";
  da = parseInt(day);
  if (
    (month == 1 ||
      month == 3 ||
      month == 7 ||
      month == 8 ||
      month == 10 ||
      month == 12) &&
    day > 31
  )
    throw "There are 31 days in this month so invaild input";

  if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30)
    throw "There are 30 days in this month so invaild input";
  if (month == 2) throw "There are 28 days in Feb so input is not vaild";
  smd = `${month}${day}`;
  let smd2 = parseInt(smd);
  a.forEach((x) => {
    u = x.date_of_birth.replace(/(\/\d\/)|\//g, "");
    dss = u.slice(0, u.length - 4).replace(/^0+/, "");
    if (parseInt(dss) === smd2) {
      str = x.first_name + " " + x.last_name;

      c.push(str);
    }
  });

  return c;
}

module.exports = {
  getPersonById,
  sameStreet,
  manipulateSsn,
  sameBirthday,
};
