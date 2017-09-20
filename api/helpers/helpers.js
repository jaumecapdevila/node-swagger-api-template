'use strict'

const R = require('ramda');

/**
 * Return the properties of the given object or false otherwise
 * @param  {Object} object The target
 * @return {Object|false}  Returns the properties of the object or false otherwise
 */
function propertiesIn(object) {
  let properties = {};
  for (let prop in object) {
    properties[prop] = R.prop(prop, object);
  }
  return (properties.length > 0 ? properties : false);
}

module.exports = {
    propertiesIn
}
