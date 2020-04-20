var express = require('express');
var router = express.Router();
Slot = require('../models/slotModel');
const passport = require("passport");

// @Route /api/slots/createSlot

router.post('/createSlot', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("req.user :", req.user);

    const time = req.body.time;
    const slotName = req.body.slotName;
    const description = req.body.description;
    const date = req.body.date;
    const createdBy = req.user._id;

    const makeSlot = new Slot({
        time: time,
        slotName: slotName,
        description: description,
        date: date,
        createdBy: createdBy
    });
    makeSlot.save().then(created => {
        res.json({ success: true, status: 200, message: "Available slot created successfully", data: created })
    }).catch(err => {
        res.json({ success: false, status: 400, message: "Bad request", data: err })
    })
})


module.exports = router;