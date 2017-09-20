'use strict';

const app = require('express')();
const SwaggerExpress = require('swagger-express-mw');
const mongoose = require('mongoose');

const apiConfig = require('./api/config/config');

// Export the express app for testing purposes
module.exports = app;

const swaggerConfig = {
    appRoot: __dirname,
    swaggerFile: __dirname + '/api/controllers/swagger/swagger.yaml',
    configDir: __dirname + '/api/config/swagger'
};

// Establish the connection with the database
mongoose.connect('mongodb://127.0.0.1:27017/translator_db_dev', (error) => {
    if (error) {
        throw Error('Error establishing a connection to the database');
    }
});

SwaggerExpress.create(swaggerConfig, function (err, swagger) {
    if (err) {
        throw err;
    }
    swagger.register(app);
    app.listen(apiConfig.port);
});
