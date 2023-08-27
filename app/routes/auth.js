const express = require("express");
const { register, login } = require("../controllers/auth");

const authRouter = express.Router();

authRouter.post("/signup", register).post("/signin", login);

module.exports = authRouter;
