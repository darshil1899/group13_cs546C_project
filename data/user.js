const bcryptjs= require("bcryptjs");
const saltRounds = 5;
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const appointments = mongoCollections.appointments;

module.exports={

async  createUser(username,password){
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

const userCollection= await users();
const appointmentCollection=await appointments();
const User = username.toLowerCase();
const Pswd = await bcryptjs.hash(password, saltRounds);
let newUser={
    username : User,
    password : Pswd
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
    const userCollection= await users();
    let name = await userCollection.findOne({username:username});
    console.log(name);
    let compare = false;
    try{
        compare = await bcrypt.compare(password,name.password)
    }
    catch(e){
        console.log(e);
    }
if(compare)
    return{authenticated:true};
else{
    throw "Invaild password or username";
}

},