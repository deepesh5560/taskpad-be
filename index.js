const express = require("express");
const mongoose = require("mongoose");
const Noterouter = require("./app/routes/notes");
const authRouter = require("./app/routes/auth");
const cateogoryrouter = require("./app/routes/cateogory");
require("dotenv").config();
var cors = require("cors");

const app = express();
app.use(cors());

const PORT =process.env.DB_PORT || 8000;
const DB = process.env.DATABASE;

app.use(express.json());

app.use("/", Noterouter);
app.use("/auth", authRouter);
app.use("/", cateogoryrouter);

mongoose
  .connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connection successfully done"))
  .catch((error) => console.log("DB connection failed"));
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
