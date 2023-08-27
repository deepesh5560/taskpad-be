const express = require("express");
const {
  createCateogory,
  getAllCateogories,
  deleteCateogory,
} = require("../controllers/createCateogory");
const { verifyUser } = require("../utils/jwt");

const cateogoryrouter = express.Router();

cateogoryrouter
  .post("/createCateogory", verifyUser, createCateogory)
  .get("/getCateogories", verifyUser, getAllCateogories)
  .delete("/deleteCateogory/:id", verifyUser, deleteCateogory);
//   .put("/updateTodo/:id", verifyUser, updateTodo);

module.exports = cateogoryrouter;
