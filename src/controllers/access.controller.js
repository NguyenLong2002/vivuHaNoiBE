"use strict";

const { CREATED, SuccessResponse, OK } = require("../core/succes.response");
const AccessService = require("../services/access.service");

class AccessController {
  signUp = async (req, res, next) => {
    new CREATED({
      message: "REgistered OK!",
      metadata: await AccessService.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);
  };

  signIn = async (req, res, next) => {
    new SuccessResponse({
      message: "Sign In success",
      metadata: await AccessService.login(req.body),
    }).send(res);
  };

  logOut = async (req, res, next) => {
    new OK({
      message: "Logout success",
      metadata: await AccessService.logout(req.keyStore),
    }).send(res);
  };

  handleRefreshToken = async (req, res, next) => {
    // new OK({
    //   message: "Get token success",
    //   metadata: await AccessService.handleRefreshToken(req.body.refreshToken),
    // }).send(res);

    new OK({
      message: "Get token success",
      metadata: await AccessService.handleRefreshTokenV2({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  };
}

module.exports = new AccessController();
