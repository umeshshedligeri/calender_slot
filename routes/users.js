var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../models/userModel')
const keys = require('../config/db')



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});



router.post('/registration', (req, res) => {
  Users.findOne({ email: req.body.email }).then(user => {
    if (user) {
      res.json({ success: false, status: 400, message: "Email already exists", data: user })
    }
    else {
      let registration = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        contactNumber: req.body.contactNumber,
        email: req.body.email,
        password: req.body.password,
        role: 'user'
      })
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(registration.password, salt, (err, hash) => {
          if (err) throw err;
          registration.password = hash;
          registration.save()
            .then(register => {
              res.json({ success: true, status: 200, message: "Registered successfully", data: register })
            })
            .catch(err => { res.json({ success: false, status: 400, message: "Bad request", data: err }) })
        })
      })
    }
  }).catch(err => { res.json({ success: false, status: 400, message: "something went wrong", data: err }) })
})

router.post('/login', (req, res) => {
  const email = req.body.email
  const password = req.body.password

  //Find User by Email
  Users.findOne({ email: email })
    .then(user => {
      if (!user) {
        return res.json({ success: false, status: 400, message: "You have entered wrong email!", data: null });
      }
      //Check Password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (isMatch) {
            //User Matched
            console.log("user :", user);
            const Payload = { id: user.id, name: user.firstName, email: user.email, role: user.role }; //Create JWT Payload
            jwt.sign(Payload, keys.secretOrKeys, { expiresIn: 604800 }, (err, token) => {
              res.json({
                success: true,
                status: 200,
                token: "Bearer " + token,
                message: "Login Successfull",
                data: Payload
              });
            });
          } else {
            return res.json({ success: false, status: 400, message: "You have entered wrong password!", data: null });
          }
        }).catch(err => {
          res.json({ success: false, status: 400, message: "Something went wrong", data: err });
        });
    }).catch(err => {
      res.json({ success: false, status: 400, message: "Bad request", data: err });
    });
});


module.exports = router;
