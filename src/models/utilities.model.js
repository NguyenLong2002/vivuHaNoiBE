"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Utilities";
const COLLECTION_NAME = "Utilities";
// Declare the Schema of the Mongo model
var utilitiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    icon: {
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
module.exports = mongoose.model(DOCUMENT_NAME, utilitiesSchema);
