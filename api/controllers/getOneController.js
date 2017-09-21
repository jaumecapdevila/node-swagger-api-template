const apiConfig = require('../config/config');
const GetOneQuery = require('../../src/context/domain/services/getOne/getOneQuery');
const GetOneQueryHandler = require('../../src/context/domain/services/getOne/getOneQueryHandler');

function getOneAction(req, res) {
  const API_METHOD = 'getOne';
  const HTTP_RESOURCE_CREATED = 200;
  const uuid = req.swagger.params.uuid.value || '';
  const query = GetOneQuery(uuid);
  GetOneQueryHandler.execute(query)
    .then((data) => {
      res.status(HTTP_RESOURCE_CREATED);
      res.json({
        apiVersion: apiConfig.version,
        method: API_METHOD,
        params: {
          uuid,
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
          uuid,
        },
        statusCode,
        errors,
      });
    });
}

module.exports = {
  getOneAction,
};
