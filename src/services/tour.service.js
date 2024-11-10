"use strict";

const bcrypt = require("bcrypt");
const KeyTokenService = require("./token.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData, generateDoubleKey } = require("../utils");
const {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} = require("../core/error.response");
const tourModel = require("../models/tour.model");

class TourService {

  static createTour = async (payload) => {
    try {
    const { name} = payload;
    const newTour = await tourModel.create(payload);
    return newTour
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };

  static updateTour = async (payload) => {
  try {
    const updatedTour = await tourModel.updateOne({ _id: payload._id }, payload); // Ensure correct query
    return updatedTour;
  } catch (error) {
    return {
      code: "xxx",
      message: error.message,
      status: "error",
    };
  }
};

static deleteTour = async (payload) => {
  try {
    const deletedTour = await tourModel.deleteOne({ _id: payload._id });
    return deletedTour;
  } catch (error) {
    return {
      code: "xxx",
      message: error.message,
      status: "error",
    };
  }
};


   static getTourById = async (id) => {
    try {
      return await tourModel.findById(id);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  static getAllTours = async () => {
  try {
    return await tourModel.find();
  } catch (error) {
    throw new Error("Error fetching tours: " + error.message);
  }
};

}

module.exports = TourService;
