const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventname:{
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true,
        min: 0,
        max: 2359,
    },
    endTime: {
        type: Date,
        required: true,
        min: 0,
        max: 2359,
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Host'
    }
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;