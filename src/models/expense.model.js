const mongoose = require("mongoose");
// const mongooseDelete = require("mongoose-delete");

const ExpenseScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    unitPrice: {
      type: Number,
      required: true,
    },
    units: {
      type: Number,
      required: true,
    },
    totalBuy: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// UserScheme.plugin(mongooseDelete, { overrideMethods: "all" });
module.exports = mongoose.model("expenses", ExpenseScheme);
