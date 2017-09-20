'use strict';

const apiConfig = require('../config/config');
const propertiesIn = require('../helpers/helpers').propertiesIn;
const CreateOfuscationCommand = require('../../src/ofuscator/domain/services/create/createOfuscationCommand');
const CreateOfuscationCommandHandler = require('../../src/ofuscator/domain/services/create/createOfuscationCommandHandler');

function ofuscateAction(req, res) {
  const API_METHOD = 'ofuscate';
  const HTTP_RESOURCE_CREATED = 201;
  const INVALID_REQUEST_HTTP_CODE = 400;
  const url = req.swagger.params.ofuscation.value.url || '';
  const command = CreateOfuscationCommand(url);
  CreateOfuscationCommandHandler.execute(command)
    .then((data) => {
      res.status(HTTP_RESOURCE_CREATED);
      res.json({
        apiVersion: apiConfig.version,
        method: API_METHOD,
        params: {
          url: command.url
        },
        statusCode: HTTP_RESOURCE_CREATED,
        data
      });
    })
    .catch((errors) => {
      res.status(INVALID_REQUEST_HTTP_CODE);
      res.json({
        apiVersion: apiConfig.version,
        method: API_METHOD,
        params: {
          url: command.url
        },
        statusCode: INVALID_REQUEST_HTTP_CODE,
        errors
      });
    });
}

module.exports = {
  ofuscateAction
};
