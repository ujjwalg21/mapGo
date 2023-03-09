const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
})

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;