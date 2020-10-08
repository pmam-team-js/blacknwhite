const express = require("express")
const users = express.Router()
const cors = require("cors")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const paginate = require('jw-paginate');

const User = require("../models/User")
users.use(cors())

process.env.SECRET_KEY = 'secret'

//Register
users.post("/register", (req, res) => {
    const today = new Date()
    const userData = {
        username: req.body.username,
        password: req.body.password,
        created: today
    }
    User.findOne({
        username: req.body.username
    })
        .then(user => {
            if (!user) {
                const hash = bcrypt.hashSync(userData.password, 10)
                userData.password = hash
                User.create(userData)
                    .then(user => {
                        const payload = {
                            id: user._id,
                            username: user.username
                        }
                        let token = jwt.sign(payload, process.env.SECRET_KEY, {
                            expiresIn: 1400
                        })
                        res.json({ token: token })
                        //res.json({ staus: user.email + " registered.." })
                    })
                    .catch(err => {
                        res.send('error' + error)
                    })
            }
            else {
                res.json({ error: 'User is already exist.' })
            }
        })
        .catch(err => {
            res.send('error' + error)
        })
});

// Login
users.post("/login", (req, res) => {
    User.findOne({
        username: req.body.username
    })
        .then(user => {
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const payload = {
                        id: user._id,
                        username: user.username
                    }
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                        expiresIn: 1400
                    })
                    res.json({ token: token })
                }
                else {
                    res.json({ error: 'User is not exist.' })
                }
            }
            else {
                res.json({ error: 'User is not exist.' })
            }

        })
        .catch(err => {
            res.send('error' + error)
        })
});

//PROFILE
users.get("/profile", (req, res) => {
    var decoded = jwt.verify(req.headers["authorization"], process.env.SECRET_KEY)
    User.findOne({
        id: decoded._id
    })
        .then(user => {
            if (user) {
                res.json(user);
            } else {
                res.send('User does not exists..')

            }
        })
        .catch(err => {
            res.send('error' + error)
        })
})

module.exports = users
