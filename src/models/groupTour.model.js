const { Schema, model } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "GroupTour";
const COLLECTION_NAME = "GroupTours";
// Declare the Schema of the Mongo model
var groupTour = new Schema(
  {
    name: {
      type: String,
      required: true
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
    collection: COLLECTION_NAME,
    timestamps: false,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, groupTour);
