const BaseModel = require('../../model/base');
const uuidv4 = require('uuid/v4');

function CreateCommandHandler() {}

CreateCommandHandler.execute = function execute(command) {
  const { propertyA, propertyB } = command;
  const uuid = uuidv4();
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
