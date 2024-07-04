require("express-router-group");
const express = require("express");
const middlewares = require("kernels/middlewares");
const { validate } = require("kernels/validations");
const authController = require("modules/auth/controllers/authController");
const authValidation = require("modules/auth/validations/authValidation");
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
router.group("/auth", (router) => {
  router.post('/register',validate([authValidation.register]),validate([authValidation.exist]), authController.register)
  router.post('/login',validate([authValidation.login]), authController.login)
})
module.exports = router;
