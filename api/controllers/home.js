'use strict';

const apiConfig = require('../config/config');

function homeAction(req, res) {
    const API_METHOD = 'homeAction';
    const HTTP_OK = 200;
    res.status(HTTP_OK);
    res.json({
        apiVersion: apiConfig.version,
        method: API_METHOD,
        params: {},
        statusCode: HTTP_OK,
        data: {
            message: 'Welcome to the URL ofuscator API'
        }
    });
}

module.exports = {
    homeAction
};
