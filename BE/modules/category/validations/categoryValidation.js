const db = require("models")
const { BodyWithLocale } = require("kernels/rules");
const categoryValidation = {
    create: [
        new BodyWithLocale('name').notEmpty(),
        //other rules goes here
    ],
    exist:[
        new BodyWithLocale('name').unique(db.Category, 'name'),
    ]
}
module.exports = categoryValidation