const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const contactsRouter = require("./routes/api/contacts");
const authRouter = require("./routes/api/user");

const app = express();

const tiny = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(tiny));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/user", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
module.exports = app;
