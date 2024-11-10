"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "OrderDetail";
const COLLECTION_NAME = "OrderDetails";
// Declare the Schema of the Mongo model
var orderDetailSchema = new mongoose.Schema(
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
    quantity: {
      type: Number,
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
    note: {
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
module.exports = mongoose.model(DOCUMENT_NAME, orderDetailSchema);
