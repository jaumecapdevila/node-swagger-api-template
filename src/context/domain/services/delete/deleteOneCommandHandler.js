const BaseModel = require('../../model/base');

function DeleteCommandHandler() {}

DeleteCommandHandler.execute = function execute(command) {
  const RESOURCE_NOT_FOUND_HTTP_CODE = 404;
  const INTERNAL_SERVER_ERROR_HTTP_CODE = 500;
  const { uuid } = command;
  return new Promise((resolve, reject) => {
    try {
      BaseModel.findOneAndRemove({ uuid }, (deleteError, removedItem) => {
        if (deleteError) {
          reject({
            statusCode: INTERNAL_SERVER_ERROR_HTTP_CODE,
            errors: {
              message: 'An unexpected error has ocurred, please try it again later.',
            },
          });
          return;
        }
        if (removedItem == null) {
          reject({
            statusCode: RESOURCE_NOT_FOUND_HTTP_CODE,
            errors: {
              message: `Model identified with ${uuid} was not found`,
            },
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

module.exports = DeleteCommandHandler;
