const sprintf = require("sprintf-js").sprintf;
const nanoid = require('nanoid')
const R = require('ramda');
const Ofuscation = require('../../model/ofuscation');

function OfuscateServiceCommandHandler() {}

OfuscateServiceCommandHandler.prototype.execute = function execute(command) {
  const servicePromise = new Promise((resolve, reject) => {
    const uniqueId = nanoid();
    const ofuscation = new Ofuscation(
      command.getOldURL(),
      uniqueId
    );
    ofuscation.save(function (error) {
      if (!error) {
        resolve({
          'ofuscation': uniqueId
        });
      }
      reject(getValidationErrors(error.errors));
    });
  });
  return servicePromise;
}

function getValidationErrors(errors) {
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

module.exports = OfuscateServiceCommandHandler;
