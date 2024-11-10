"use strict";
const crypto = require("node:crypto");

const _ = require("lodash");

const getInfoData = ({ field = [], object }) => {
  return _.pick(object, field);
};

const generateDoubleKey = () => {
  const privateKey = crypto.randomBytes(64).toString("hex");
  const publicKey = crypto.randomBytes(64).toString("hex");

  return {
    privateKey,
    publicKey,
  };
};

const getSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 1]));
};

const unGetSelectData = (select = []) => {
  return Object.fromEntries(select.map((el) => [el, 0]));
};

const removeUndefinedObject = (obj) => {
  const newObj = {};

  Object.keys(obj).forEach((key) => {
    if (_.isObject(obj[key]) && !Array.isArray(obj[key])) {
      const response = removeUndefinedObject(obj[key]);

      Object.keys(response).forEach((a) => {
        newObj[`${key}.${a}`] = response[a];
      });
    } else if(obj[key]) {
      newObj[key] = obj[key];
    }

  });

  return newObj;
};

module.exports = {
  getInfoData,
  generateDoubleKey,
  getSelectData,
  unGetSelectData,
  removeUndefinedObject,
};
