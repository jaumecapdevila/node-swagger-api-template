const sprintf = require("sprintf-js").sprintf;
const nanoid = require('nanoid');
const R = require('ramda');
const Ofuscation = require('../../model/ofuscation');

function CreateOfuscationCommandHandler() {}

CreateOfuscationCommandHandler.execute = function execute(command) {
  return new Promise((resolve, reject) => {
    const url = command.url;
    const uniqueId = nanoid();
    try {
      const ofuscation = new Ofuscation({
        url,
        uniqueId
      });
      ofuscation.save(function (error) {
        if (!error) {
          resolve({
            ofuscation: uniqueId
          });
        }
        reject(validationErrors(error.errors));
      });
    } catch (error) {
      reject({
        message: "An unexpected error has ocurred, please try it again later."
      })
    }
  });
};

function validationErrors(errors) {
  const validationErrors = [];
  for (var property in errors) {
    validationErrors.push({
      message: errors[property].message,
      path: errors[property].path,
      value: errors[property].value
    })
  }
  return validationErrors;
}

module.exports = CreateOfuscationCommandHandler;
