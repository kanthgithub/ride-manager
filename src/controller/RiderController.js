const riderService = require('../service/RiderService');

const riderController = {

    createRide : async (request, response) => {
        let responseData = await riderService.createRide(request.body);
        let statusCode = 201;
        let jsonData = null;
        if (responseData) {
            jsonData = responseData;
        }else{
           statusCode =  500;
        }
         response
            .status(statusCode)
            .json(jsonData);
    },

    healthCheck : async (request, response) => {
        //let responseData = await riderService.healthCheck(request.body);
        let statusCode = 200;
        let jsonData = 'healthy';
         response
            .status(statusCode)
            .json(jsonData);
    },

    findAllRides : async (request, response) => {
        let responseData = await riderService.findAllRides(request.query);
        let statusCode = 200;
        let jsonData = null;
        if (responseData) {
            jsonData = responseData;
        }else{
           statusCode =  500;
        }
         response
            .status(statusCode)
            .json(jsonData);
    },

    getRideDetail : async (request, response) => {
        let responseData = await riderService.getRideDetails(request.params["id"]);
        let statusCode = 200;
        let jsonData = null;
        if (responseData) {
            jsonData = responseData;
        }else{
           statusCode =  500;
        }
         response
            .status(statusCode)
            .json(jsonData);
    }
};

module.exports = riderController;