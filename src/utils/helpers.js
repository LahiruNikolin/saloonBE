const jwt = require("jsonwebtoken");

const generateTokens = async (user, both = false) => {
  let refreshToken;
  const payload = { _id: user._id, email: user.email };

  try {
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "2d" }
    );

    if (both) {
      refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
        expiresIn: "30d",
      });
    }
    return { accessToken, refreshToken };
  } catch (err) {
    return Promise.reject(err);
  }
};

const generateColor = () =>
  "#" +
  Math.floor(Math.random() * (1 << (3 * 8)))
    .toString(16)
    .padStart(6, "0");
    
module.exports = {
  generateTokens,
  generateColor,
};
