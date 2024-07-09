const responseUtils = require("utils/responseUtils");
const authService = require("modules/auth/services/authService");
const jwtUtils = require("utils/jwtUtils");
const authController = {
  index: (req, res) => {
    // Implement your logic
    return responseUtils.ok(res, {
      a: result,
    });
  },
  register: async (req, res) => {
    try {
      const { username, password, email } = req.body;
      const result = await authService.create({ username, password, email });
      return responseUtils.ok(res, result);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },
  login: async (req, res) => {
    try {
      const { password, email } = req.body;
      const result = await authService.login({ password, email });
      if (result) {
        return responseUtils.ok(res, result);
      } else {
        responseUtils.notFound(res);
      }
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },
  sendMail: async (req, res) => {
    try {
      const { email } = req.body;
      const result = await authService.sendMail(email);
      if (result) {
        return responseUtils.ok(res, result);
      } else {
        responseUtils.notFound(res);
      }
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { email, code,newPassword } = req.body;
      const result = await authService.resetPassword({ email, code,newPassword });
      // console.log({ result });
      responseUtils.ok(res, result);
    } catch (error) {
      return responseUtils.error(res, error.message);
    }
  },
  refreshToken: async (req, res) => {
    const refreshToken = await authService.getRefreshToken(12); // test id=12
    if (!refreshToken) res.sendStatus(401);
    let newAccessToken = jwtUtils.verifyToken(refreshToken).accessToken;
  },
};
module.exports = authController;
