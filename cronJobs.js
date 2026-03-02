const cron = require('node-cron');
const Reservation = require('./models/Reservation');
const BannedUser = require('./models/BannedUser');

async function runAutoBanJob() {
    console.log('Checking for no-show reservationd');
    try{
        const expiredReservations = await Reservation.getExpiredReservations();
        for(let reservation of expiredReservations) {
            await Reservation.updateStatus(reservation._id, 'no_show');

            const bannedUser = await BannedUser.findOne({ user: reservation.user});
            if(!bannedUser){
                await BannedUser.create({
                    user: reservation.user
                });
                console.log(`User ${reservation.user} banned.`);
            }
        }
    } catch(error){
        console.error('Error processing no-shows:', error);
    }
}

async function runAutoUnbanJob() {
    console.log('Checking for users eligible for unban');

    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const usersToUnban = await BannedUser.find({
            banned_at: { $lt: thirtyDaysAgo }
        });

        for (let user of usersToUnban) {
            await BannedUser.deleteOne({ _id: user._id });
            console.log(`User ${user.user} has been unbanned.`);
        }

    } catch (error) {
        console.error('Error processing auto-unban:', error);
    }
}

cron.schedule('* * * * *', runAutoBanJob);
cron.schedule('* * * * *', runAutoUnbanJob);

module.exports = {runAutoBanJob, runAutoUnbanJob};