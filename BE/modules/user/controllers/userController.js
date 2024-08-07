const responseUtils = require('utils/responseUtils');
const userService = require('modules/user/services/userService');
const userController = {
    index: (req, res) => {
        // Implement your logic
        return responseUtils.ok(res, {
            a: result,
        });
    },
    getUsers: async (req, res) => {
        try {
            const { page, limit, key, status, jh } = req.query;
            const result = await userService.findAndCountAll({ page, limit, key, status, jh });
            console.log({ result });
            if (result) {
                return responseUtils.ok(res, result);
            } else {
                return responseUtils.notFound(res, 'Get all users failed');
            }
        } catch (error) {
            return responseUtils.error(res, error.message);
        }
    },
    getUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const result = await userService.findById(userId);
            console.log({ result });
            if (result) {
                return responseUtils.ok(res, result);
            } else {
                return responseUtils.notFound(res, 'Get all users failed');
            }
        } catch (error) {
            return responseUtils.error(res, error.message);
        }
    },
    deleteUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const result = await userService.delete(userId);
            console.log({ result });
            if (result > 0) {
                return responseUtils.ok(res, 'User deleted successfully');
            } else {
                responseUtils.notFound(res, 'User not found or has been deleted');
            }
        } catch (error) {
            return responseUtils.error(res, error.message);
        }
    },
    restoreUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const result = await userService.restore(userId);
            console.log({ result });
            if (result > 0) {
                return responseUtils.ok(res, 'User restored successfully');
            } else {
                responseUtils.notFound(res, 'User not found or has been restored');
            }
        } catch (error) {
            return responseUtils.error(res, error.message);
        }
    },
};
module.exports = userController;
