const responseUtils = require('utils/responseUtils');
const categoryService = require('modules/category/services/categoryService');
const jwtUtils = require('utils/jwtUtils');
const categoryController = {
    index: (req, res) => {
        // Implement your logic
        return responseUtils.ok(res, {
            a: result,
        });
    },
    getCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const result = await categoryService.findOne(categoryId);
            console.log({ result });
            if (result) {
                return responseUtils.ok(res, result);
            } else {
                return responseUtils.notFound(res, 'Get detail of a category failed');
            }
        } catch (error) {
            return responseUtils.error(res, error.message);
        }
    },
    getCategoryAll: async (req, res) => {
        console.log('hehe');
        try {
            const result = await categoryService.findAll();
            console.log({ result });
            if (result) {
                return responseUtils.ok(res, result);
            } else {
                return responseUtils.notFound(res, 'Get all categories  failed');
            }
        } catch (error) {
            return responseUtils.error(res, error.message);
        }
    },
    createCategory: async (req, res) => {
        try {
            console.log('da');
            const { name } = req.body;
            console.log({ re: req.body });
            const result = await categoryService.create({ name });
            return responseUtils.ok(res, result);
        } catch (error) {
            return responseUtils.notFound(res, 'Category has been used');
        }
    },
    updateCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const { name } = req.body;
            console.log({ categoryId, name });
            const affectedRows = await categoryService.update({ categoryId, name });
            console.log({ affectedRows });
            if (affectedRows > 0) {
                return responseUtils.ok(res, 'category updated  successfully');
            } else {
                responseUtils.notFound(res, 'Category not found');
            }
        } catch (error) {
            return responseUtils.error(res, error.message);
        }
    },
    deleteCategory: async (req, res) => {
        try {
            const { categoryId } = req.params;
            const result = await categoryService.delete(categoryId);
            console.log({ result });
            if (result > 0) {
                return responseUtils.ok(res, 'Category deleted successfully');
            } else {
                responseUtils.notFound(res, 'Failed to delete category');
            }
        } catch (error) {
            return responseUtils.error(res, error.message);
        }
    },
};
module.exports = categoryController;
