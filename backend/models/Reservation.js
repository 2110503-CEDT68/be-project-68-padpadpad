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

ReservationSchema.statics.updateStatus = async function(reservation_id,status){
    return this.findByIdAndUpdate(
        reservation_id,
        {status},
        {new: true}
    );
};

ReservationSchema.statics.getExpiredReservations = async function(){
    const today = new Date();
    today.setHours(0,0,0,0);

    return this.find({
        status: 'pending',
        date: {$lt: today}
    });
};

module.exports = mongoose.model('Reservation', ReservationSchema);