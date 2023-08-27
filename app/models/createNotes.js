const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let createTodoSchema = new Schema({
  note: {
    type: "String",
    required: true,
  },
  userId: {
    type: "String",
    required: true,
  },
  cateogoryId: {
    type: "String",
    required: true,
  },
  completed: {
    type: "boolean",
    required: true,
  },
});

module.exports = mongoose.model("Todo", createTodoSchema);
