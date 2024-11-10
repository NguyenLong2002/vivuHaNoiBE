'use strict'

const userModel = require("../models/user.model")

const bcrypt = require("bcrypt");
const KeyTokenService = require("./token.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData, generateDoubleKey } = require("../utils");
const {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} = require("../core/error.response");

class UserService {

    static findByEmail = async ({email, select = {
    email: 1,
    password: 2,
    name: 1,
    status: 1,
    roles: 1,
    }}) => {
        return await userModel.findOne({email}).select(select).lean();
    }

  static createUser = async (payload) => {
    try {
    const { name} = payload;
    const newUser = await userModel.create(payload);
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };

  static updateUser = async (payload) => {
    try {
    const { name} = payload;
    const newUser = await userModel.updateOne(payload);
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };

  static deleteUser = async (payload) => {
    try {
    const { name} = payload;
    const newUser = await userModel.deleteOne(payload);
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };

   static getUserById = async (id) => {
    try {
      return await userModel.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getAllUsers = async () => {
  try {
    return await userModel.find(); 
  } catch (error) {
    throw new Error("Error fetching Users: " + error.message);
  }
};

}

module.exports = UserService;
