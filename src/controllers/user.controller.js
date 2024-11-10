"use strict";

const { CREATED, SuccessResponse, OK } = require("../core/succes.response");
const UserService = require("../services/user.service")

class UserController {


 
  createUser = async (req, res, next) => {
  try {
    const newUser = await UserService.createUser(req.body);
    new CREATED({
      message: "Registered OK!",
      metadata: newUser,
    }).send(res);
  } catch (error) {
    next(error);
  }
};


  updateUser = async (req, res, next) => {
    new CREATED({
      message: "REgistered OK!",
      metadata: await UserService.updateUser(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };

  deleteUser = async (req, res, next) => {
    new CREATED({
      message: "REgistered OK!",
      metadata: await UserService.deleteUser(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };

  getUserById = async (req, res, next) => {
    try {
      const User = await UserService.getUserById(req.params.id);
      new OK({ metadata: User }).send(res);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (req, res, next) => {
  try {
    const Users = await UserService.getAllUsers(); 
    res.status(200).json({
      status: "success",
      data: Users,
    });
  } catch (error) {
    next(error); 
  }
};

}

module.exports = new UserController();
