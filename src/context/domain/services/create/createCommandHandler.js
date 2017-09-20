const BaseModel = require('../../model/base');

function CreateCommandHandler() {}

CreateCommandHandler.execute = function execute(command) {
  const { propertyA, propertyB } = command;
  return new Promise((resolve, reject) => {
    try {
      const model = new BaseModel({
        propertyA,
        propertyB,
      });
      model.save((error) => {
        if (!error) {
          resolve({});
          return;
        }
        reject(error.errors);
      });
    } catch (error) {
      reject({
        message: 'An unexpected error has ocurred, please try it again later.',
      });
    }
  });
};

module.exports = CreateCommandHandler;
