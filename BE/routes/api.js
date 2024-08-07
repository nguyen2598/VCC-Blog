require('express-router-group');
const express = require('express');
const middlewares = require('../middlewares/middlewares');
const { validate } = require('kernels/validations');
const authController = require('modules/auth/controllers/authController');
const authValidation = require('modules/auth/validations/authValidation');
const categoryController = require('modules/category/controllers/categoryController');
const categoryValidation = require('modules/category/validations/categoryValidation');
const languageController = require('modules/language/controllers/languageController');
const languageValidation = require('modules/language/validations/languageValidation');
const ownerController = require('modules/owner/controllers/ownerController');
const userController = require('modules/user/controllers/userController');
const upload = require('middlewares/uploadFile');
const fileController = require('modules/file/controllers/fileController');
const router = express.Router({ mergeParams: true });

// ===== EXAMPLE Request, make this commented =====
// router.group("/posts",middlewares([authenticated, role("owner")]),(router) => {
//   router.post("/create",validate([createPostRequest]),postsController.create);
//   router.put("/update/:postId",validate([updatePostRequest]),postsController.update);
//   router.delete("/delete/:postId", postsController.destroy);
// }
// );

// router.group("/example", validate([]), (router) => {
//   router.get('/', exampleController.exampleRequest)
// })
router.group('/auth', (router) => {
    router.post(
        '/register',
        validate([authValidation.register]),
        validate([authValidation.exist]),
        authController.register,
    );
    router.post('/login', validate([authValidation.login]), authController.login);
    router.get('/checkToken', middlewares.verifyToken, authController.checkToken);
    router.post('/recover-password', validate([authValidation.email]), authController.sendMail);
    router.post('/reset-password', validate([authValidation.forgotPassword]), authController.resetPassword);
});
router.group('/users', (router) => {
    router.get('/', userController.getUsers);
    router.get('/:userId', userController.getUser);
    router.delete('/delete/:userId', userController.deleteUser);
    router.delete('/restore/:userId', userController.restoreUser);
});
router.group('/languages', (router) => {
    router.get('/', languageController.getLanguageAll);
    router.get('/:languageId', languageController.getLanguage);
    router.post(
        '/create',
        validate([languageValidation.create, languageValidation.exist]),
        languageController.createLanguage,
    );
    router.put('/update/:languageId', languageController.updateLanguage);
    router.delete('/delete/:languageId', languageController.deleteLanguage);
});
router.group('/categories', (router) => {
    router.get('/', categoryController.getCategoryAll);
    router.get('/:categoryId', categoryController.getCategory);
    router.post(
        '/create',
        validate([categoryValidation.create]),
        validate([categoryValidation.exist]),
        categoryController.createCategory,
    );
    router.put('/update/:categoryId', categoryController.updateCategory);
    router.delete('/delete/:categoryId', categoryController.deleteCategory);
});
router.group('/post', (router) => {
    router.post('/create-post', ownerController.createPost);
});
router.group('/files', (router) => {
    router.post('', upload.single('uploaded_file'), fileController.upload);
});

module.exports = router;
