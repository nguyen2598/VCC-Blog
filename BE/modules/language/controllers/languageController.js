const responseUtils = require('utils/responseUtils');
const languageService = require('modules/language/services/languageService');
const languageController = {
    index: (req, res) => {
        // Implement your logic
        return responseUtils.ok(res, {
            a: result,
        });
    },
    getLanguage: async (req, res) => {
        try {
            const { languageId } = req.params;
            const result = await languageService.findOne(languageId);
            console.log({ result });
            if (result) {
                return responseUtils.ok(res, result);
            } else {
                return responseUtils.notFound(res, 'Get detail of a language failed');
            }
        } catch (error) {
            return responseUtils.error(res, error.message);
        }
    },
    getLanguageAll: async (req, res) => {
        try {
            const result = await languageService.findAll();
            console.log({ result });
            if (result) {
                return responseUtils.ok(res, result);
            } else {
                return responseUtils.notFound(res, 'Get all languages failed');
            }
        } catch (error) {
            return responseUtils.error(res, error.message);
        }
    },
    createLanguage: async (req, res) => {
        try {
            const { name, locale, flag } = req.body;
            const result = await languageService.create({ name, locale, flag });
            if (result) {
                return responseUtils.ok(res, result);
            } else {
                return responseUtils.notFound(res, 'language locale has been used');
            }
        } catch (error) {
            return responseUtils.error(res, error.message);
        }
    },
    updateLanguage: async (req, res) => {
        try {
            const { languageId } = req.params;
            const { name, locale, flag } = req.body;
            const affectedRows = await languageService.update({ languageId, name, locale, flag });
            console.log({ affectedRows });
            if (affectedRows > 0) {
                return responseUtils.ok(res, 'Language created successfully');
            } else {
                responseUtils.notFound(res, 'language not found or has been deleted');
            }
        } catch (error) {
            return responseUtils.error(res, error.message);
        }
    },
    deleteLanguage: async (req, res) => {
        try {
            const { languageId } = req.params;
            const result = await languageService.delete(languageId);
            console.log({ result });
            if (result > 0) {
                return responseUtils.ok(res, 'Language deleted successfully');
            } else {
                responseUtils.notFound(res, 'language not found or has been deleted');
            }
        } catch (error) {
            return responseUtils.error(res, error.message);
        }
    },
};
module.exports = languageController;
