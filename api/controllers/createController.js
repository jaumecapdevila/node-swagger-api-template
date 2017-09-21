const apiConfig = require('../config/config');
const CreateCommand = require('../../src/context/domain/services/create/createCommand');
const CreateCommandHandler = require('../../src/context/domain/services/create/createCommandHandler');

function createAction(req, res) {
  const API_METHOD = 'create';
  const HTTP_RESOURCE_CREATED = 201;
  const uuid = req.swagger.params.model.value.uuid || null;
  const propertyA = req.swagger.params.model.value.propertyA || '';
  const propertyB = req.swagger.params.model.value.propertyB || '';
  const command = CreateCommand(uuid, propertyA, propertyB);
  CreateCommandHandler.execute(command)
    .then((data) => {
      res.status(HTTP_RESOURCE_CREATED);
      res.json({
        apiVersion: apiConfig.version,
        method: API_METHOD,
        params: {
          propertyA,
          propertyB,
        },
        statusCode: HTTP_RESOURCE_CREATED,
        data,
      });
    })
    .catch((errorResponse) => {
      const { statusCode, errors } = errorResponse;
      res.status(statusCode);
      res.json({
        apiVersion: apiConfig.version,
        method: API_METHOD,
        params: {
          propertyA,
          propertyB,
        },
        statusCode,
        errors,
      });
    });
}

module.exports = {
  createAction,
};
