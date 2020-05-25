const riderErrorConstants = require('../constants/RiderErrorConstants')
module.exports = async (data) => {

    const start_coordinate_latitude = Number(data.start_lat);
    const start_coordinate_longitude = Number(data.start_long);
    const end_coordinate_latitude = Number(data.end_lat);
    const end_coordinate_longitude = Number(data.end_long);
    const riderName = data.rider_name;
    const driverName = data.driver_name;
    const driverVehicle = data.driver_vehicle;

    if (start_coordinate_latitude < -90 || start_coordinate_latitude > 90 || start_coordinate_longitude < -180 || start_coordinate_longitude > 180) {
        throw {
            error_code: 'VALIDATION_ERROR',
            message: riderErrorConstants.ERR_INVALID_START_COORDINATES
        };
    }

    if (end_coordinate_latitude < -90 || end_coordinate_latitude > 90 || end_coordinate_longitude < -180 || end_coordinate_longitude > 180) {
        throw {
            error_code: 'VALIDATION_ERROR',
            message: riderErrorConstants.ERR_INVALID_END_COORDINATES
        };
    }

    if (typeof riderName !== 'string' || riderName.length < 1) {
        throw {
            error_code: 'VALIDATION_ERROR',
            message: riderErrorConstants.ERR_INVALID_RIDER
        };
    }

    if (typeof driverName !== 'string' || driverName.length < 1) {
        throw {
            error_code: 'VALIDATION_ERROR',
            message: riderErrorConstants.ERR_INVALID_DRIVER
        };
    }

    if (typeof driverVehicle !== 'string' || driverVehicle.length < 1) {
        throw {
            error_code: 'VALIDATION_ERROR',
            message: riderErrorConstants.ERR_INVALID_VEHICLE
        };
    }

    let response = [data.start_lat, data.start_long, data.end_lat, data.end_long, data.rider_name, data.driver_name, data.driver_vehicle];

    return response;
};
