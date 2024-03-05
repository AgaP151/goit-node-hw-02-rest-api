const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../schemas/authSchema");
const { HttpError } = require("../helpers/HttpError");
const { SECRET_KEY } = process.env;
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email already in use");
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });

  res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  const { _id: id } = user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(id, { token });
  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, name, subscription } = req.user;

  res.json({
    name,
    email,
    subscription,
  });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(204).json({
    message: "No Content. Logout success",
  });
};

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload } = req.file;
  // const { path: tempUpload } = req.file;
  try {
    const avatar = await jimp.read(tempUpload);
    await avatar.resize(250, 250).write(tempUpload);
  } catch (error) {
    return next(error);
  }

  const { _id } = req.user;
  const filename = `${_id}_${Date.now()}.jpg`;
  const resultUpload = path.join(avatarsDir, filename);

  try {
    await fs.rename(tempUpload, resultUpload);
  } catch (error) {
    return next(error);
  }

  const avatarURL = path.join("avatars", filename);
  try {
    await User.findByIdAndUpdate(_id, { avatarURL });
    return res.status(200).json({
      avatarURL,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  register,
  login,
  getCurrent,
  logout,
  updateAvatar,
};
