const {ObjectId} = require('bson');
const bcryptjs= require("bcryptjs");
const saltRounds = 5;
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const appointments = mongoCollections.appointments;

module.exports={

async  createUser(username,password, firstname, lastname, city, phonenumber, gender, dateofbirth, email){
    if (typeof username !== 'string'|| typeof password !== 'string')
    {
        throw 'Username should be a string';
    }
    if (username.length === 0 || password.length === 0) 
   {
        throw 'Username and password cannot be a empty string';
    }
    if (username.trim().length === 0)
    {
        throw 'Username cannot have empty spaces';
    }

    let regEx = /^[a-zA-Z]+$/;
  if (!username.match(regEx))
   {
  throw "Please enter letters and numbers only";
  }
  let regexp = /\s/g;
{
    if (password.match(regexp))
     throw " password is not valid";
  }
    if (/\s/.test(username)) 
    {
        throw 'Username cannot have white spaces';
    }
    if (/\s/.test(password))
    {
        throw 'Password cannot have white spaces';
    }
    if (username.length < 4)
    {
        throw 'username should contain at least 4 characters';
    }
    if (password.length < 6)
    {
        throw 'password should contain at least 6 characters';
    }
    let ptn = "^[a-zA-Z0-9]*$"
    if (username.match(ptn) === null) {
        throw 'username should contain only alphanumeric characters';
    }
    if(!(phonenumber.match(`^([0-9]{3})-([0-9]{3})-([0-9]{4})$`))) {
        throw 'You must provide the phone number in given format.'}
    

const userCollection= await users();
const appointmentCollection=await appointments();
const User = username.toLowerCase();
const Pswd = await bcryptjs.hash(password, saltRounds);
let newUser={
    username : User,
    password : Pswd,
    firstname : firstname,
    lastname : lastname,
    city: city,
    dateofbirth : dateofbirth,
    email : email,
    phonenumber : phonenumber,
    gender : gender
}

    let present=await userCollection.findOne({username: username });
    if(present !== null)
        throw "This username is already present"
    let insertInfo= userCollection.insertOne(newUser);
    if(insertInfo.insertedCount===0)
        throw"User is not created"
    return {userInserted:true};
},

async checkUser(username, password){
  
    if (typeof username !== 'string' || typeof password != 'string') {
        throw 'username and password should be a string';
    }
    if (username.length === 0 || password.length === 0) 
   {
        throw 'username and password  is empty';
    }
    if (username.trim().length === 0) 
   {
        throw 'username cannot be empty';
    }
    if (username.length<= 3) 
   {
        throw 'username should have atleast 4 characters';
    }
    if (password.length<= 5) 
    {
        throw 'password should have atleast 6 characters';
    }
    if (/\s/.test(username))
    {
        throw 'username has white spaces';
    }
    if (/\s/.test(password))
    {
        throw 'password has white spaces';
    }
    let regEx = /^[a-zA-Z]+$/;
    if (!username.match(regEx))
     {
    throw "Please enter letters and numbers only";
    }
    let regexp = /\s/g;
    {
      if (password.match(regexp))
       throw " password is not valid";
    }

    const userCollection= await users();
    let name = await userCollection.findOne({username:username});
    console.log(name);
    let compare = false;
    try
    {
        compare = await bcrypt.compare(password,name.password)
    }
    catch(e)
    {
        console.log(e);
    }

if(compare)
{
    return{authenticated:true};
}
else
{
    throw "Invaild password or username";
}

},
async updateProfile(id,firstname, lastname, username, dateofbirth,gender,city, email, phonenumber){

    const proInfo = await this.get(id);
    let proLower = users.toLowerCase();
    
    let proUpdate =
     {
        
    firstname: firstname,
    lastname: lastname,
    username: username,
    dateofbirth: dateofbirth,
    city: city,
    gender: gender,
    email: email,
    phonenumber : phonenumber
    
    }
    
    const userCollection= await users();
    const proUpdateInfo = await userCollection.updateOne(
        {_id:ObjectId(id)},
        {$set :  proUpdate}
    );
    
    if(!proUpdateInfo.matchedCount && !proUpdateInfo.modifiedCount)
    throw 'updation failed';
    return {updateInserted : true};
    },
}
async  appointmentconf(firstname, lastname, dateofbirth,gender, email, phonenumber, problem, doctor, date, time){
    if (typeof firstname !== 'string'|| typeof lastname !== 'string' || typeof dateofbirth !== 'date' || typeof gender !== 'string' || typeof email !== 'email' || typeof phonenumber !== 'number'
    || typeof problem !== 'string'|| typeof doctor !== 'string'|| typeof date !== 'date'|| typeof time !== 'string')
    {
        throw 'Username should be a string';
    }
    if(!firstname || !lastname ||!dateofbirth ||!email||!phonenumber||!gender||!problem||!doctor ||!date||!time)throw"provide a valid data"
    if (firstname.length === 0 || lastname.length === 0||email.length===0||phonenumber.length ===0) 
   {
        throw 'Username and password cannot be a empty string';
    }
        if (firstname.trim().length === 0)
        {
            throw 'firstname cannot have empty spaces';
        }
        if (/\s/.test(firstname)) 
        {
            throw 'firstname cannot have white spaces';
        }
        if (lastname.trim().length === 0)
        {
            throw 'lastname cannot have empty spaces';
        }
        if (/\s/.test(lastname)) 
        {
            throw 'lastname cannot have white spaces';
        }
        if (email.trim().length === 0)
        {
            throw 'email cannot have empty spaces';
        }
        if (/\s/.test(email)) 
        {
            throw 'email cannot have white spaces';
        }
        if (phonenumber.trim().length === 0)
        {
            throw 'phonenumber cannot have empty spaces';
        }
        if (/\s/.test(phonenumber)) 
        {
            throw 'phonenumber cannot have white spaces';
        }
        if (firstname.length < 4)
            {
                throw 'firstname should contain at least 4 characters';
            }
            if (lastname.length < 4)
            {
                throw 'lastname should contain at least 4 characters';
            }
            if (phonenumber.length < 9)
            {
                throw 'password should contain at least 10 characters';
            }
            let ptn = "^[a-zA-Z0-9]*$"
            if (username.match(ptn) === null) {
                throw 'username should contain only alphanumeric characters';
            }