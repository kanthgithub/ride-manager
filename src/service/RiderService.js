const riderRepository = require('../repository/RiderRepository');
const validateRide = require('../ValidateRide')

const RiderService = {

    createRide : async (rideRequest) => {
        return riderRepository.createRide(validateRide(rideRequest));
    },

    findAllRides : async (rideRequestParameters) => {
        return riderRepository.findAllRides(rideRequestParameters);
    },

    findRideDetails : async (id) => {
        return riderRepository.findRideDetails(id);
    }
};

module.exports = RiderService;