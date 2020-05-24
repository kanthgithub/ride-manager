/**
 *  Handle Response Object either Success or Failure and its convert into proper structure here.
 */
const ResponseDataUtil = {

    create: (statusCode, success, message) => {
        return {
            success: status,
            statusCode: statusCode,
            message: message
        };
    },

    create: (statusCode, success, message, data) => {
        return {
            success: success,
            statusCode: statusCode,
            message: message,
            data: data,
        };
    },

    createDefaultError: () => {
        return {
            success: false,
            statusCode: 500,
            message: 'An Error Occured.'
        };
    },

    updateResponse: (response, responseData) => {
        let jsonData = {
            success: responseData.success,
            message: responseData.message
        };
        if (responseData.data) {
            jsonData.data = responseData.data;
        }
        response
            .status(responseData.statusCode)
            .json(jsonData);
    }

};

module.exports = ResponseDataUtil;
