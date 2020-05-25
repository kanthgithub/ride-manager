'use strict';

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const express = require('express');
const app = express();

app.use(bodyParser.urlencoded({extended: true}),)
    .use(bodyParser.json());

app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

app.use(express.static('doc'));

app.get('/docs', (req, res) => {
    res.sendFile(rootPath.join(__dirname, 'html/doc.html'));
});

const cors = require('cors');
const riderRoutes = require('./src/routes/RiderRouter');

app.use("/", riderRoutes)
    .use(function (req, res) {
        return res.status(404).send({message: 'Route' + req.url + ' Not found.'});
    })
    .use(cors);

require('dotenv').config()
const port = process.env.PORT || 8010;

const logger = require('./src/constants/logger');

app.listen(port, () => logger.info(`App started and listening on port ${port}`));

module.exports = app;