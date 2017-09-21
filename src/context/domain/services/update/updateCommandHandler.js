const BaseModel = require('../../model/base');
const uuidv4 = require('uuid/v4');

function UpdateCommandHandler() {}

UpdateCommandHandler.execute = function execute(command) {
  const INVALID_REQUEST_HTTP_CODE = 400;
  const INTERNAL_SERVER_ERROR_HTTP_CODE = 500;
  const { uuid, propertyA, propertyB } = command;
  return new Promise((resolve, reject) => {
    try {
      BaseModel.update({ uuid }, { uuid, propertyA, propertyB }, {}, (error) => {
        if (error) {
          reject({
            statusCode: INVALID_REQUEST_HTTP_CODE,
            errors: error.errors,
          });
          return;
        }
        resolve({});
      });
    } catch (error) {
      reject({
        statusCode: INTERNAL_SERVER_ERROR_HTTP_CODE,
        errors: {
          message: 'An unexpected error has ocurred, please try it again later.',
        },
      });
    }
  });
};

module.exports = UpdateCommandHandler;
