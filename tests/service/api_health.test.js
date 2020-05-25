'use strict';

let mocha = require('mocha');
let describe = mocha.describe;
const request = require('supertest');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');
const buildSchemas = require('../../src/schemas/schemas');
const decache = require('decache');

var app;
describe('API tests', () => {
    beforeEach( (done) => {
        process.env.MODE = 'test';
        delete require.cache[require.resolve( '../../index' )]
         app = require('../../index', { bustCache: true });
         db.serialize((err) => { 
            if (err) {
                return done(err);
            }
            buildSchemas(db);
            done();
        });
    });
    afterEach( (done) => {
        // delete the cached module:
        decache('../../index');
        decache('app');
        delete process.env.MODE;
        console.log(`closing express test server`);
        done();
        console.log(`done - closing express test server`);
    });

    it('should return health', (done) => {
        request(app)
            .get('/health')
            .expect('Content-Type', "application/json; charset=utf-8")
            .expect(200, done);
    });
});