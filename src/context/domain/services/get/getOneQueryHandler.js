const BaseModel = require('../../model/base');

function GetOneQueryHandler() {}

GetOneQueryHandler.execute = function execute(query) {
  const RESOURCE_NOT_FOUND_CODE = 404;
  const INVALID_REQUEST_CODE = 400;
  const INTERNAL_SERVER_ERROR = 500;
  const { uuid } = query;
  return new Promise((resolve, reject) => {
    try {
      BaseModel.findOne({ uuid }, 'uuid propertyA propertyB', (err, model) => {
        if (err) {
          reject({
            statusCode: INVALID_REQUEST_CODE,
            errors: err.errors,
          });
          return;
        }
        if (!model) {
          reject({
            statusCode: RESOURCE_NOT_FOUND_CODE,
            errors: {
              message: `Model identified with ${uuid} was not found`,
            },
          });
          return;
        }
        const { uuid: modelUuid, propertyA, propertyB } = model;
        resolve({
          modelUuid,
          propertyA,
          propertyB,
        });
      });
    } catch (error) {
      reject({
        statusCode: INTERNAL_SERVER_ERROR,
        errors: {
          message: 'An unexpected error has ocurred, please try it again later.',
        },
      });
    }
  });
};

module.exports = GetOneQueryHandler;
