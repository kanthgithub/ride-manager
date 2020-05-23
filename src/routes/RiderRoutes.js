const router = require('express').Router();
const riderController = require('../controllers/RiderController');

/* Events api path */
router.route('/health').get(riderController.healthCheck);
router.route('/rides').post(riderController.createRide);
router.route('/rides').get(eventController.getRides);
router.route('/rides/:id').get(eventController.getRideDetails);

module.exports = router;