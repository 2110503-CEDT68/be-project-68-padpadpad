<<<<<<< HEAD
const express = require('express');
const {getReservations, getReservation, addReservation, updateReservation, deleteReservation, checkIn} = require('../controllers/reservations');

const router = express.Router({mergeParams:true});

const {protect, authorize} = require('../middleware/auth');

router.route('/')
    .get(protect, getReservations)
    .post(protect,authorize('admin','user'), addReservation);
router.route('/:id')
    .get(getReservation)
    .put(protect, authorize('admin','user'),updateReservation)
    .delete(protect,authorize('admin','user'), deleteReservation);
router.put('/:id/checkin',protect,checkIn);
module.exports = router;

=======
const express = require('express');
const {getReservations, getReservation, addReservation, updateReservation, deleteReservation, checkIn} = require('../controllers/reservations');

const router = express.Router({mergeParams:true});

const {protect, authorize} = require('../middleware/auth');

router.route('/')
    .get(protect, getReservations)
    .post(protect,authorize('admin','user'), addReservation);
router.route('/:id')
    .get(getReservation)
    .put(protect, authorize('admin','user'),updateReservation)
    .delete(protect,authorize('admin','user'), deleteReservation);
router.put('/:id/checkin',protect,checkIn);
module.exports = router;

>>>>>>> 66ab5e975cd37578cdf11d2a11a01a5e241e54ac
