const db = require('./db');
const util = require('util');
const riderErrorConstants = require('../constants/RiderErrorConstants');
const logger = require('../constants/logger');

const riderRepository = {

    createRide : async (riderData) => {
      try {
            const lastID = await riderRepository.dbRunCreate("INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)", riderData);
            return await riderRepository.getRideDetails(lastID);
        } catch (error) {
            return null;
        }
    },

    /**
     * Fetch all Rides in System
     * @returns {Promise<*>}
     */
    findAllRides: async (offset, limit) => {
        logger.debug(`RiderRepository - findAllRides: limit - ${limit} offset - ${offset}`)
        let params = [];
        let sql;
        if(offset>0 && limit >0){
            sql = 'SELECT * FROM Rides LIMIT ? OFFSET ?';
            params = [ limit, offset ];
        }else if(limit >0){
            sql = 'SELECT * FROM Rides LIMIT ?';
            params = [limit];
        }else{
            sql = 'SELECT * FROM Rides';     
        }
        
        return new Promise((resolve, reject) => {
            db.all(sql, params, function(err, rows) {
                if (err) {
                    logger.error(`RiderRepository - findAllRides: error - ${err}`);
                    return reject(err);
                }
                logger.debug(`RiderRepository - findAllRides: response - ${JSON.stringify(rows)}`);
                return resolve(rows);
            });
        });
    },

    getRideDetails : async (id) => {
        return new Promise((resolve, reject) => {
            db.all('SELECT * FROM Rides WHERE rideID=?', id, function(err, rows) {
                if (err) {
                    logger.error(`getRideDetails err: ${err}`);
                    return reject(err);
                }
                return resolve(rows);
            });
        });
    },

    dbRunCreate : (sql, params) => {
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) { 
                    reject({ error_code: 'SERVER_ERROR', message: 'Unknown error' });
                    logger.error(`dbRunCreate err: ${err}`);
                }
                resolve(this.lastID);
            });
        });
    },

    dbRunDeleteAll : (sql, id) => {
        return new Promise((resolve, reject) => {
            db.run(sql, function(err) {
                if (err) {
                   console.error(err.message);
                   reject(true)
                }
                console.log(`Row(s) deleted ${this.changes}`);
                console.log(`row deleted`);
                resolve(this.changes);
              }
            );
        });
    },
}

module.exports = riderRepository;