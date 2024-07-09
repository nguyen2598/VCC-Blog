const db = require("models")
const { BodyWithLocale } = require("kernels/rules");
const userValidation = {
    getUsers: [
        new BodyWithLocale('username').notEmpty(),
        new BodyWithLocale('password').notEmpty(),
        new BodyWithLocale('email').notEmpty(),
        //other rules goes here
    ],
    delete: [
        new BodyWithLocale('password').notEmpty(),
        new BodyWithLocale('email').notEmpty(),
        //other rules goes here
    ],
    email: [
        new BodyWithLocale('email').notEmpty(),
        //other rules goes here
    ],
    forgotPassword:[
        new BodyWithLocale('email').notEmpty(),
        new BodyWithLocale('code').notEmpty(),
        new BodyWithLocale('newPassword').notEmpty(),
        //other rules goes here
    ],
    exist:[
        new BodyWithLocale('username').unique(db.User, 'username'),
    ]
}
module.exports = userValidation