const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    coop: {
        type: mongoose.Schema.ObjectId,
        ref: 'Coop',
        required: true
    },
    date: {
            type: Date,
            required: true
        },
    start_time: {
        type: String
    },
    end_time: {
        type: String
    },
    status: {
        type: String,
        enum: ['pending', 'checked_in', 'no_show'],
        default: 'pending'
    }
},{
    timestamps: true
});



module.exports = mongoose.model('Reservation', ReservationSchema);