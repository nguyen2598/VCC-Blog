const db = require("models")
const { BodyWithLocale } = require("kernels/rules");
const authValidation = {
    register: [
        new BodyWithLocale('username').notEmpty(),
        new BodyWithLocale('password').notEmpty(),
        new BodyWithLocale('email').notEmpty(),
        //other rules goes here
    ],
    login: [
        new BodyWithLocale('password').notEmpty(),
        new BodyWithLocale('email').notEmpty(),
        //other rules goes here
    ],
    exist:[
        new BodyWithLocale('username').unique(db.Users, 'username'),
    ]
}
module.exports = authValidation