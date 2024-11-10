"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "AboutMe";
const COLLECTION_NAME = "AboutMes";
// Declare the Schema of the Mongo model
var aboutMeSchema = new mongoose.Schema(
  {
    is_active: {
      type: Number,
      enum: [0, 1],
      default: 0,
    },
    logo: {
      type: String,
      default: null,
    },
    map: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      default: Date.now,
    },
    updated_at: {
      type: Date,
      default: Date.now,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: false,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, aboutMeSchema);
