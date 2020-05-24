const riderRouter = require('express').Router();
const riderController = require('../controller/RiderController');

/* Events api path */
riderRouter.route('/health').get(riderController.healthCheck);
riderRouter.route('/rides').post(riderController.createRide);
riderRouter.route('/rides').get(riderController.findAllRides);
riderRouter.route('/rides/:id').get(riderController.getRideDetail);

module.exports = riderRouter;