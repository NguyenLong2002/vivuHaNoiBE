"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = 'User';
const COLLECTION_NAME = 'Users';
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
    index: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    default: null,
  },
  address: {
    type: String,
    default: null,
  },
  dateOfBirth: {
    type: Date,
    default: null,
  },
  sex: {
    type: String,
    default: "male",
    enum: ["male", "female", "other"]
  },
  role_user: {
    type: String,
    default: "customer",
    enum: ["admin", "staff", "customer"]
  },
  avatar: {
    type: String,
    default: null
  },
  is_active: {
    type: Boolean,
    default: true
  },
  time_expired: {
    type: Date,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  deleted_at: {
    type: Date,
    default: null
  }
}, {
    timestamps: false,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema);
