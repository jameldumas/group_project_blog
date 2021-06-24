const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  // register new user accounts
    register: (req, res) => {
        // 
        const user = new User(req.body);
        console.log("in register");
        console.log(user);
        console.log("in register - 2");

        user.save()
        .then((user) => {
            console.log("successfully registered");
            res.json({ message: "Successfully registered!", user: user})
        })
        .catch((err) => {
            console.log("register not successful!");
            res.status(400).json(err);
        });
    },

    // login
    // 1 - check to see if the user document exists based on the
    //    email address passed in
    // 2 - check to see if the password matches
    login: (req, res) => {
        console.log(req.body);

        User.findOne({ email: req.body.email })
        .then((userRecord) => {
            if(userRecord === null) {
            res.status(400).json({ message: "email address not found"});
            } else {
            // compare passwords using bcrypt
            bcrypt.compare(req.body.password, userRecord.password)
                .then((passwordValid) => {
                if(passwordValid) {
                    console.log("password is valid");
                    res
                    // plain text cookie that anyone can look at and read
                    .cookie("userdata", { username: userRecord.username })
                    // encrypted / secured data in cookie
                    .cookie("usertoken", 
                        jwt.sign({
                            user_id: userRecord._id,
                            username: userRecord.username
                        }, process.env.JWT_SECRET),
                        {
                            expires: new Date(Date.now() + 9000000), 
                            httpOnly: true
                        }
                        )
                    .json({
                        message: "Successfully logged in",
                        userLoggedIn: userRecord.username,
                        userId: userRecord._id,
                    })
                } else {
                    res.status(400).json({ message: "password didn't match"});
                }
                })
            }
        })
        .catch((err) => {
            res.status(400).json({ message: "error in login"});
        })
    },


    logout: (req, res) => {
        console.log("logged out!");
        res.clearCookie("usertoken");
        res.json({ message: "You have successfully logged out!"});
    }
}