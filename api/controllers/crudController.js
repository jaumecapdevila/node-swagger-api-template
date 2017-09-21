const apiConfig = require('../config/config');
const PostOneCommand = require('../../src/context/domain/services/create/postOneCommand');
const PostOneCommandHandler = require('../../src/context/domain/services/create/postOneCommandHandler');
const GetOneQuery = require('../../src/context/domain/services/get/getOneQuery');
const GetOneQueryHandler = require('../../src/context/domain/services/get/getOneQueryHandler');
const PutOneCommand = require('../../src/context/domain/services/update/putOneCommand');
const PutOneCommandHandler = require('../../src/context/domain/services/update/putOneCommandHandler');
const DeleteOneCommand = require('../../src/context/domain/services/delete/deleteOneCommand');
const DeleteOneCommandHandler = require('../../src/context/domain/services/delete/deleteOneCommandHandler');

function postOneAction(req, res) {
  const API_METHOD = 'create';
  const HTTP_RESOURCE_CREATED = 201;
  const uuid = req.swagger.params.model.value.uuid || null;
  const propertyA = req.swagger.params.model.value.propertyA || '';
  const propertyB = req.swagger.params.model.value.propertyB || '';
  const command = PostOneCommand(uuid, propertyA, propertyB);
  PostOneCommandHandler.execute(command)
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


function putOneAction(req, res) {
  const API_METHOD = 'update';
  const HTTP_NO_CONTENT_CODE = 204;
  const uuid = req.swagger.params.uuid.value || '';
  const propertyA = req.swagger.params.model.value.propertyA || '';
  const propertyB = req.swagger.params.model.value.propertyB || '';
  const command = PutOneCommand(uuid, propertyA, propertyB);
  PutOneCommandHandler.execute(command)
    .then((data) => {
      res.status(HTTP_NO_CONTENT_CODE);
      res.json({
        apiVersion: apiConfig.version,
        method: API_METHOD,
        params: {
          uuid,
          propertyA,
          propertyB,
        },
        statusCode: HTTP_NO_CONTENT_CODE,
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
          propertyA,
          propertyB,
        },
        statusCode,
        errors,
      });
    });
}

function deleteOneAction(req, res) {
  const API_METHOD = 'delete';
  const HTTP_NO_CONTENT_CODE = 204;
  const uuid = req.swagger.params.uuid.value || '';
  const command = DeleteOneCommand(uuid);
  DeleteOneCommandHandler.execute(command)
    .then((data) => {
      res.status(HTTP_NO_CONTENT_CODE);
      res.json({
        apiVersion: apiConfig.version,
        method: API_METHOD,
        params: {
          uuid,
        },
        statusCode: HTTP_NO_CONTENT_CODE,
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
  postOneAction,
  getOneAction,
  putOneAction,
  deleteOneAction,
};
