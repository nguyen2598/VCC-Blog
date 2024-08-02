const { config } = require('configs');
const jwt = require('jsonwebtoken');
const jwtUtils = require('utils/jwtUtils');
const responseUtils = require('utils/responseUtils');

const verifyToken = async (req, res, next) => {
    try {
        let accessToken = req?.headers?.authorization?.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json({
                err: 1,
                msg: 'missing authorization',
            });
        } else {
            // jwtUtils.verifyToken
            jwt.verify(accessToken, config.jwt.secret, (err, decodeUser) => {
                if (err) {
                    return res.status(401).json({
                        err: 1,
                        msg: 'token het han',
                    });
                } else {
                    req.user = decodeUser;
                    next();
                }
            });
        }
    } catch (error) {
        return responseUtils.error(res, error.message);
    }
};
module.exports = { verifyToken };
