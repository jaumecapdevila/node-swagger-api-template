'use strict';

const apiConfig = require('../config/config');
const propertiesIn = require('../helpers/helpers').propertiesIn;
const ServiceCommand = require('../../src/ofuscator/domain/services/ofuscate/ofuscateServiceCommand');
const ServiceCommandHandler = require('../../src/ofuscator/domain/services/ofuscate/ofuscateServiceCommandHandler');

function ofuscateAction(req, res) {
  const API_METHOD = 'ofuscate';
  const HTTP_OK_CODE = 200;
  const INVALID_REQUEST_HTTP_CODE = 400;
  const oldURL = req.swagger.params.translation.value.oldURL || '';
  const serviceCommand = new ServiceCommand(oldURL);
  ServiceCommandHandler.execute(serviceCommand)
    .then((data) => {
      res.status(HTTP_OK_CODE);
      res.json({
        'apiVersion': apiConfig.version,
        'method': API_METHOD,
        'params': propertiesIn(serviceCommand),
        data
      });
    })
    .catch((errors) => {
      res.status(INVALID_REQUEST_HTTP_CODE);
      res.json({
        'apiVersion': apiConfig.version,
        'method': API_METHOD,
        'params': propertiesIn(serviceCommand),
        errors
      });
    });
}

module.exports = {
  ofuscateAction
};
