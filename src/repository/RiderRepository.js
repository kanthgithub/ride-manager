const db = require('../db');

const RiderRepository = {

    createRide : async (riderData) => {
      try {
            const lastID = await dbRun('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', riderData);
            return await dbAll('SELECT * FROM Rides WHERE rideID = ?', lastID);
        } catch (error) {
            return null;
        }
    },

    /**
     * Fetch all Rides in System
     * @returns {Promise<*>}
     */
    findAllRides: async (page, limit) => {
        let sql = 'SELECT * FROM Rides';
        let params = [];
        if (page) {
            sql = 'SELECT * FROM Rides LIMIT ? OFFSET ?';
            const offset = (page - 1) * limit;
            params = [ limit, offset ];
        }
        try {
            const rows = await this.dbAll(sql, params);
            return rows;
        } catch (error) {
            return null;
        }
    },

    dbOne : async (id) => {
     try {
            return await dbAll('SELECT * FROM Rides WHERE rideID=?', [id]);
        } catch (error) {
            return null; 
        }
    },

    dbAll : async (sql, params) => {
        const promised = (util.promisify(db.all)).bind(db);
        try {
            const rows = await promised(sql, params);
            if (rows.length === 0) {
                throw {
                    error_code: 'RIDES_NOT_FOUND_ERROR',
                    message: 'Could not find any rides'
                };
            }
            return rows;
        } catch (error) {
            if (error.error_code !== 'RIDES_NOT_FOUND_ERROR') {
                throw {
                    error_code: 'SERVER_ERROR',
                    message: 'Unknown error'
                };
            } else {
                throw error;
            }
        }
    }, 

    dbRun : (sql, params) => {
        return new Promise((resolve, reject) => {
            db.run(sql, params, function (err) {
                if (err) reject({ error_code: 'SERVER_ERROR', message: 'Unknown error' });
                resolve(this.lastID);
            });
        });
    };
}

module.exports = RiderRepository;