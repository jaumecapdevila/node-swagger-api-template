const BaseModel = require('../../model/base');
const uuidv4 = require('uuid/v4');

function CreateCommandHandler() {}

CreateCommandHandler.execute = function execute(command) {
  const INVALID_REQUEST_HTTP_CODE = 404;
  const INTERNAL_SERVER_ERROR_HTTP_CODE = 500;
  let { uuid } = command;
  const { propertyA, propertyB } = command;
  if (uuid == null) {
    uuid = uuidv4();
  }
  return new Promise((resolve, reject) => {
    try {
      const model = new BaseModel({
        uuid,
        propertyA,
        propertyB,
      });
      model.save((error) => {
        if (!error) {
          resolve({});
          return;
        }
        reject({
          statusCode: INVALID_REQUEST_HTTP_CODE,
          errors: error.errors,
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

module.exports = CreateCommandHandler;
