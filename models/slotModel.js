const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlotsSchema = new Schema({
    created_at: {
        type: Date,
        default: Date.now()
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    time: {
        type: String,
        required: true
    },
    slotName: {
        type: String
    },
    description: {
        type: String,
    },
    // date: {
    //     type: Date
    // },
    status: {
        type: String,
        default: "available"
    },
    bookedUserInfo: []
});



module.exports = slot = mongoose.model('slot', SlotsSchema);
