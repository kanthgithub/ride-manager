'use strict';

let mocha = require('mocha');
let describe = mocha.describe;
const request = require('supertest');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const buildSchemas = require('../../src/schemas/schemas');
const decache = require('decache');
const assert = require('assert');

var app;
describe('API tests', () => {
    before((done) => {
        process.env.MODE = 'test';
        db.serialize((err) => { 
            if (err) {
                return done(err);
            }
            buildSchemas(db);
            done();
        delete require.cache[require.resolve( '../../index' )]
         app = require('../../index', { bustCache: true });
    })});
    
    after( (done) => {
        // delete the cached module:
        decache('../../index');
        delete process.env.MODE;
        console.log(`closing express test server`);
        done();
        console.log(`done - closing express test server`);
    });

    it('RiderService should create new ride', (done) => {
        request(app)
            .post('/rides')
            .send({
                start_lat: 80,
                start_long: 80,
                end_lat: 80,
                end_long: 80,
                rider_name: 'Lakshmi Kanth',
                driver_name: 'Jonathan',
                driver_vehicle: 'SUV',
            })
            .expect('Content-Type', /json/)
            .expect(201)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body[0].rideID, 1);
                assert.ok(res.body[0].created);
                done();
            });
    });

    it('RiderService should extract all rides', (done) => {

        for (let index=0; index < 10; i++) {
            db.run(`
                INSERT INTO Rides (startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            `, [75, 65, 66, 77, 'Lakshmi', 'Kanth', 'SUV']);
            done();
        }


        request(app)
            .get('/rides')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                assert.equal(res.body.length, 10);
                done();
            });
    });
});