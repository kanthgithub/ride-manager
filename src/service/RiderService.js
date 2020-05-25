const riderRepository = require('../repository/RiderRepository');
const parseRideParameters = require('./ParseRideParameters')
const riderErrorConstants = require('../constants/RiderErrorConstants');
const logger = require('../constants/logger');

const riderService = {

    createRide : async (rideRequest) => {
        let rideDataParameters = await parseRideParameters(rideRequest);
        return riderRepository.createRide(rideDataParameters);
    },

    findAllRides : async (rideRequestParameters) => {
        let limit = rideRequestParameters.limit || 10;
        let page = rideRequestParameters.page || 1;
        let offset = 0;
        logger.info(`RiderService - findAllRides: limit - ${limit} page - ${page}`)
        if(page>1){
          offset = (page * limit) - limit;
        }
        try {
            let rides = await riderRepository.findAllRides(offset,limit);
            if (rides && rides.length === 0) {
                 var data = {
                    "error_code": riderErrorConstants.ERR_CODE_RIDE_NOT_FOUND,
                    "message": riderErrorConstants.ERR_RIDE_NOT_FOUND
                };
                return data;
            }
            return rides;
        }catch(err){
            logger.error(`RiderService - error: limit - ${err}`)
            let data = {
                "error_code": riderErrorConstants.ERR_CODE_SERVER_ERROR,
                "message": riderErrorConstants.ERR_UNKNOWN
            };
            return data;
        }
    },

    getRideDetails : async (id) => {
        try{
            let rideDetail = await  riderRepository.getRideDetails(id);
            if (rideDetail && rideDetail.length === 0) {
                var data = {
                   "error_code": riderErrorConstants.ERR_CODE_RIDE_NOT_FOUND,
                   "message": riderErrorConstants.ERR_RIDE_NOT_FOUND
               };
               return data;
           }
           return rideDetail;
        }catch(error){
            let data = {
                "error_code": riderErrorConstants.ERR_CODE_SERVER_ERROR,
                "message": riderErrorConstants.ERR_UNKNOWN
            };
            return data;
        }
    }
};

module.exports = riderService;