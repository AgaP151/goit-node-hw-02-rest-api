const express = require("express");
const {
  register,
  login,
  getCurrent,
  logout,
} = require("../../controllers/authControll");
const validateBody = require("../../helpers/validateBody");
const authenticate = require("../../services/authenticate");

const { schemas } = require("../../schemas/authSchema");

const authRouter = express.Router();

authRouter.post("/signup", validateBody(schemas.registerSchema), register);

authRouter.post("/login", validateBody(schemas.loginSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

module.exports = authRouter;
