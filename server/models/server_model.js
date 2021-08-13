const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const serverSchema = new Schema({
    ipAddress: {
        type: String,
        required: true
    },
    Name: {
        type: String,
        required: true
    },
    Type: {
        Name: {
            type: String,
            required: true,
        },
        pricePerMinute: {
            type: Number,
            required: true
        }
    },
    Running: {
        isRunning: {
            type: Boolean,
            required: true
        },
        startTime: {
            type: Date,
        }
    }

});


module.exports = mongoose.model('servers', serverSchema);