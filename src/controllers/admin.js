const Admin = require("../models/admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateTokens } = require("../utils/helpers");

const create = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email: email });
    if (admin)
      return res.status(400).json({ msg: "admin already exists", data: null });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(password, salt);

    const newadmin = await new Admin({
      email,
      password: hashPassword,
      role: "super_admin",
    }).save();

    res.json({ msg: "admin Added Successfully", data: newadmin });
  } catch (error) {
    res.status(500).json({ msg: "admin create failed", error });
  }
};

const verifyRefreshToken = async (refreshToken) => {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

  try {
    let response = await Admin.findOne({ refreshToken: refreshToken });

    // let decoded = jwt.verify(refreshToken, privateKey);

    res.json({ msg: "admin verified", data: response });
  } catch (error) {
    res.json({ msg: "admin verify failed", error });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email: email });
    if (!admin)
      return res
        .status(400)
        .json({ msg: "Invalid email or password", data: null });

    const verifiedPassword = await bcrypt.compare(password, admin.password);

    if (!verifiedPassword)
      return res
        .status(400)
        .json({ msg: "Invalid email or password", data: null });

    const { accessToken } = await generateTokens(admin);

    res.json({
      msg: "admin logged in Successfully",
      data: { accessToken },
    });
  } catch (error) {
    return res.status(500).json({ msg: "admin login failed", error });
  }
};

module.exports = {
  login,
  create,
};
