const { Schema, model } = require("mongoose"); // Erase if already required

const DOCUMENT_NAME = "Evaluate";
const COLLECTION_NAME = "Evaluates";
// Declare the Schema of the Mongo model
var evaluateSchema = new Schema(
  {
    star: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5],
      default: 5,
    },
    message: {
      type: String,
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    tour_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Tour',
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
module.exports = model(DOCUMENT_NAME, evaluateSchema);
