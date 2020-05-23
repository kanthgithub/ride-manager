const riderService = require('../service/RiderService');

module.exports = {

    createRide : async (request, response) => {
        let responseData = await riderService.createRide(request.body);
         if (responseData.data) {
            jsonData.data = responseData.data;
        }
         response
            .status(responseData.statusCode)
            .json(jsonData);
    },

    healthCheck : async (request, response) => {
        let responseData = await riderService.healthCheck(request.body);
         if (responseData.data) {
            jsonData.data = responseData.data;
        }
         response
            .status(responseData.statusCode)
            .json(jsonData);
    },

    findAllRides : async (request, response) => {
        let responseData = await riderService.findAllRides(request.body);
         if (responseData.data) {
            jsonData.data = responseData.data;
        }
         response
            .status(responseData.statusCode)
            .json(jsonData);
    },

    findARideDetail : async (request, response) => {
        let responseData = await riderService.findARideDetail(request.body);
         if (responseData.data) {
            jsonData.data = responseData.data;
        }
         response
            .status(responseData.statusCode)
            .json(jsonData);
    }
};