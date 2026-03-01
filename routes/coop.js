const express = require('express');
const {getCoops,getCoop,createCoop, updateCoop, deleteCoop} = require('../controllers/coop');
const reservationRouter = require('./reservation');

const router = express.Router();
router.use('/:coopId/reservations', reservationRouter);

router.route('/').get(getCoops).post(createCoop);
router.route('/:id').get(getCoop).put(updateCoop).delete(deleteCoop);


module.exports = router;





