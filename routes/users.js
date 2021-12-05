const {ObjectId} = require('bson');
const express = require("express");
const { users } = require("../config/mongoCollections");
const router= express.Router();
const data= require('../data/users');

router.get('/', async(req,res) =>{
    let reqSes = Object.keys(req.session);
    if(reqSes.includes('username')){
        res.redirect("/patient");
        return;
    }
    else{
        res.render("login/login");
        return;
    }
});

router.post('/login', async(req,res) => {
    try{
        if (!req.body.username || !req.body.password) {
            res.status(400).render("login/login", { error: "Username or Password is not provided "});
            return;
        }
        const User = await data.checkUser(req.body.username, req.body.password);
        // console.log(User); 
        if(User.authenticated){
        // { authenticated: true, authenticatedUser: user }
        req.session.username = req.body.username.toLowerCase();
 
        // req.session.userId = User.authenticatedUser._id.toString();
            res.redirect("/patient");
            return;
        }
    }
    catch(e){
       console.log(e)
        res.status(400).render("login/login",{error:"Username and password is not valid"});
        return;
    }
});