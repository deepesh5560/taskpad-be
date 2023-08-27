const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let cateogory = new Schema({
  name: {
    type: "String",
    required: true,
  },
  userId: {
    type: "String",
    required: true,
  },
});

module.exports = mongoose.model("cateogory", cateogory);
