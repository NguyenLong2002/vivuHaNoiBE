"use strict";

const mongoose = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Tour";
const COLLECTION_NAME = "Tours";
// Declare the Schema of the Mongo model
var tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    // address: {
    //   type: String,
    //   required: true,
    // },
    // utiliti_ids: {
    //   type: Array,
    //   default: [],
    // },
    // room_ids: {
    //   type: Array,
    //   default: [],
    // },
    // regulation_ids: {
    //   type: Array,
    //   default: [],
    // },
    // questionAsk_ids: {
    //   type: Array,
    //   default: [],
    // },
    // images: {
    //   type: Array,
    //   default: [],
    // },
    // price: {
    //   type: Number,
    //   default: null,
    //   required: true,
    // },
    // description: {
    //   type: String,
    //   default: null,
    // },
    // map: {
    //   type: String,
    //   default: null,
    // },
    // quantity: {
    //   type: Number,
    //   default: null,
    //   required: true,
    // },
    // group_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "GroupTour",
    // },
    // created_at: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updated_at: {
    //   type: Date,
    //   default: Date.now,
    // },
    // deleted_at: {
    //   type: Date,
    //   default: null,
    // },
  },
  {
    timestamps: false,
    collection: COLLECTION_NAME,
  }
);

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, tourSchema);
