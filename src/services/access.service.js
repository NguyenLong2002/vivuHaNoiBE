"use strict";

const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const KeyTokenService = require("./token.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData, generateDoubleKey } = require("../utils");
const {
  BadRequestError,
  AuthFailureError,
  ForbiddenError,
} = require("../core/error.response");
const { findByEmail } = require("./user.service");

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      //step 1: check email exist
      const holderShop = await UserModel.findOne({ email }).lean();
      if (holderShop) {
        throw new BadRequestError("Error: Shop already registered");
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = await UserModel.create({
        name,
        email,
        password: passwordHash,
      });

      if (newUser) {
        //create privateKey, publicKey
        const { publicKey, privateKey } = generateDoubleKey();
        const tokens = await createTokenPair({
          publicKey,
          privateKey,
          payload: { user_id: newUser.id, email },
        });

        return {
          code: 201,
          metadata: {
            shop: getInfoData({
              field: ["_id", "name", "email"],
              object: newUser,
            }),
            tokens,
          },
        };
      }

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };

  /**
   *
   * @step
   * 1 - check email in dbs
   * 2 - match password
   * 3 - create PublicKey and PrivateKey save
   * 4 - generate tokens
   * 5 - get data return login
   */
  static login = async ({ email, password, refreshToken = null }) => {
    //1.
    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new BadRequestError("Shop not registered");
    //2.
    const match = bcrypt.compare(password, foundShop.password);
    if (!match) throw new AuthFailureError("Authentication Error");
    //3.
    const { publicKey, privateKey } = generateDoubleKey();
    //4.
    const tokens = await createTokenPair({
      publicKey,
      privateKey,
      payload: { user_id: foundShop._id, email },
    });

    await KeyTokenService.createKeyToken({
      privateKey,
      publicKey,
      user_id: foundShop._id,
      refreshToken: tokens.refreshToken,
    });

    return {
      shop: getInfoData({ field: ["_id", "name", "email"], object: foundShop }),
      tokens,
    };
  };

  static logout = async (keyStore) => {
    return await KeyTokenService.removeKeyById(keyStore._id);
  };

  static handleRefreshTokenV2 = async ({ refreshToken, user, keyStore }) => {
    const { user_id, email } = user;
    console.log("//refresh", user_id, email)
    if (keyStore.refreshTokenUsed.includes(refreshToken)) {
      await KeyTokenService.deleteKeyById(user_id);
      throw new ForbiddenError("Something wrong happen!! Pls relogin");
    }

    if (keyStore.refreshToken !== refreshToken)
      throw new AuthFailureError("Shop not registered");
    const foundShop = await findByEmail({ email });
    if (!foundShop) throw new AuthFailureError("Shop not registered");

    //create new token
    const tokens = await createTokenPair({
      publicKey: keyStore.publicKey,
      privateKey: keyStore.privateKey,
      payload: { user_id, email },
    });

    //update token
    await keyStore.updateOne({
      $set: {
        refreshToken: tokens.refreshToken,
      },
      $addToSet: {
        refreshTokenUsed: refreshToken,
      },
    });

    return {
      user,
      tokens,
    };
  };
}

module.exports = AccessService;
