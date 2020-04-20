var express = require('express');
var router = express.Router();
Slot = require('../models/slotModel');

// @Route /api/slots/getAvailableSlots
router.get('/getAvailableSlots', (req, res) => {
    Slot.find({ status: "available" }).then(slots => {
        if (slots.length > 0) {
            res.json({ success: true, status: 200, message: "Available slots found successfully", data: slots })
        }
        else {
            res.json({ success: false, status: 204, message: "No available slots", data: [] })
        }
    }).catch(err => {
        res.json({ success: false, status: 400, message: "Bad request or no data found", data: err })
    })
})

module.exports = router;