const riderRepository = require('../repository/RiderRepository');
const validateRide = require('./ValidateRide')

const riderService = {

    createRide : async (rideRequest) => {
        let rideDataParameters = await validateRide(rideRequest);
        return riderRepository.createRide(rideDataParameters);
    },

    findAllRides : async (rideRequestParameters) => {
        let limit = rideRequestParameters.limit || 10;
        let page = rideRequestParameters.page || 1;
        let offset = (page * limit) - limit;
        return riderRepository.findAllRides(offset,limit);
    },

    getRideDetails : async (id) => {
        return riderRepository.getRideDetails(id);
    }
};

module.exports = riderService;