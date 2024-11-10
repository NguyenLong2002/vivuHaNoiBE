"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Order";
const COLLECTION_NAME = "Orders";
// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tour_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Tour",
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
module.exports = mongoose.model(DOCUMENT_NAME, orderSchema);
