const db = require("models")
const { BodyWithLocale } = require("kernels/rules");
const languageValidation = {
    create: [
        new BodyWithLocale('name').notEmpty(),
        new BodyWithLocale('locale').notEmpty(),
        new BodyWithLocale('flag').notEmpty(),
        //other rules goes here
    ],
    exist:[
        new BodyWithLocale('name').unique(db.Language, 'name'),
        new BodyWithLocale('locale').unique(db.Language, 'locale'),
    ]
}
module.exports = languageValidation