const BaseModel = require('../../model/base');

function UpdateCommandHandler() {}

UpdateCommandHandler.execute = function execute(command) {
  const INVALID_REQUEST_HTTP_CODE = 400;
  const RESOURCE_NOT_FOUND_HTTP_CODE = 404;
  const INTERNAL_SERVER_ERROR_HTTP_CODE = 500;
  const { uuid, propertyA, propertyB } = command;
  return new Promise((resolve, reject) => {
    try {
      BaseModel.findOne({ uuid }, 'uuid propertyA propertyB', (findErrors, model) => {
        if (findErrors) {
          reject({
            statusCode: INTERNAL_SERVER_ERROR_HTTP_CODE,
            errors: {
              message: 'An unexpected error has ocurred, please try it again later.',
            },
          });
          return;
        }
        if (!model) {
          reject({
            statusCode: RESOURCE_NOT_FOUND_HTTP_CODE,
            errors: {
              message: `The model identified with ${uuid} was not found.`,
            },
          });
          return;
        }
        model.propertyA = propertyA;
        model.propertyB = propertyB;
        model.save((saveErrors) => {
          if (!saveErrors) {
            resolve({});
            return;
          }
          reject({
            statusCode: INVALID_REQUEST_HTTP_CODE,
            errors: saveErrors.errors,
          });
        });
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
