"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Room";
const COLLECTION_NAME = "Rooms";
// Declare the Schema of the Mongo model
var roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    size: {
      type: Number,
      required: true,
    },
    slot: {
      type: Number,
      required: true,
    },
    utilities: {
      type: Array,
      default: [],
    },
    images: {
      type: Array,
      default: [],
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
module.exports = mongoose.model(DOCUMENT_NAME, roomSchema);
