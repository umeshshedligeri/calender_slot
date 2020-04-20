var express = require('express');
var router = express.Router();
Slot = require('../models/slotModel');

// @Route /api/slots/bookSlot

router.put('/bookSlot', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const slotId = req.body.slotId;
    const description = req.body.description;
    let obj = {
        name: name,
        email: email,
        description: description,
    }

    Slot.findOneAndUpdate(
        slotId,
        { $set: { status: "booked" } },
        { $push: { bookedUserInfo: obj } },

    ).then(booked => {
        if (booked) {
            res.json({ success: true, status: 200, message: "Slot booked successfully", data: booked })
        }
        else {
            res.json({ success: false, status: 204, message: "Error while booking", data: booked })
        }
    }).catch(err => {
        res.json({ success: false, status: 400, message: "Bad request", data: err })
    })
})

module.exports = router;