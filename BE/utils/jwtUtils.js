const { config } = require("configs");
const jwt = require("jsonwebtoken");

module.exports = {
  sign: (userId, userRole) => {
    const access_token = jwt.sign(
      {
        userId: userId,
        role: userRole,
      },
      config.jwt.secret,
      {
        expiresIn: config.jwt.ttl,
      }
    );

    return access_token;
  },
  signRefreshToken: (userId, userRole) => {
    const refresh_token = jwt.sign(
      {
        userId: userId,
        role: userRole,
      },
      config.jwt.secret,
      {
        expiresIn: "1y",
      }
    );

    return refresh_token;
  },
  verifyToken: (token) => {
   jwt.verify(token, config.jwt.secret, (err, data) => {
      if (err) return { accessToken: null };
      const accessToken = sign(data.userId, data.userRole);
      return { accessToken };
    });
  },
};
