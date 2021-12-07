const { ObjectId } = require('bson');
const express = require("express");
const { users } = require("../config/mongoCollections");
const router = express.Router();
const data = require('../data/users');

router.get('/', async (req, res) => {
    let reqSes = Object.keys(req.session);
    if (reqSes.includes('username')) {
        res.redirect("/patient");
        return;
    }
    else {
        res.render("login/login");
        return;
    }
});

router.post('/login', async (req, res) => {
    try {
        if (!req.body.username || !req.body.password) {
            res.status(400).render("login/login", { error: "Username or Password is not provided " });
            return;
        }
        const User = await data.checkUser(req.body.username, req.body.password);

        if (User.authenticated) {

            req.session.username = req.body.username.toLowerCase();

            res.redirect("/patient");
            return;
        }
    }
    catch (e) {
        console.log(e)
        res.status(400).render("login/login", { error: "Username and password is not valid" });
        return;
    }
});

router.get('/patient', async (req, res) => {
    try {
        let sess = req.session;

        res.render("patient/patient", { username: sess['username'] });
        return;

    }
    catch (e) {
        console.log(e);
    }
});

router.get('/book', async (req, res) => {

    res.render("book/book", { username: (req.session)['username'] });
    return;
});

router.get('/profile', async (req, res) => {

    let sess = req.session;
    res.render("profile/profile", { username: sess['username'], firstname: sess['firstname'] });
    return;
});
