const express = require("express");
const {
  createTodo,
  getAllTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/createTodo");
const { verifyUser } = require("../utils/jwt");

const Noterouter = express.Router();

Noterouter.post("/createTodo", verifyUser, createTodo)
  .get("/getTodo/:cateoId", verifyUser, getAllTodo)
  .delete("/deleteTodo/:id", verifyUser, deleteTodo)
  .put("/updateTodo/:id", verifyUser, updateTodo);

module.exports = Noterouter;
