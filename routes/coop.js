const express = require('express');
const {getCoops,getCoop,createCoop, updateCoop, deleteCoop} = require('../controllers/coop');
const reservationRouter = require('./reservation');

const router = express.Router();

const {protect, authorize} = require('../middleware/auth');
router.use('/:coopId/reservations', reservationRouter);

router.route('/').get(getCoops).post(protect,authorize('admin'), createCoop);
router.route('/:id').get(getCoop).put(protect,authorize('admin'), updateCoop).delete(protect,authorize('admin'), deleteCoop);


module.exports = router;





