const db = require('models');
const { where } = require('sequelize');
const LanguageService = {
    findAll: async () => {
        const Languages = await db.Language.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'name', 'locale', 'flag', ['createdAt', 'created_at'], ['updatedAt', 'updated_at']],
        });
        return Languages;
    },
    findOne: async (languageId) => {
        const Language = await db.Language.findOne({
            // raw: true,
            // nest: true,
            where: { id: languageId },
            attributes: ['id', 'name', 'locale', 'flag', ['createdAt', 'created_at'], ['updatedAt', 'updated_at']],
        });
        return Language;
    },
    create: async ({ name, locale, flag }) => {
        console.log({ name, locale, flag: { a: 1, ...flag } });
        const newLanguage = await db.Language.create({ name, locale, flag });
        return newLanguage;
    },
    update: async ({ languageId, name, locale, flag }) => {
        let [affectedRows] = await db.Language.update(
            { name, locale, flag },
            {
                where: { id: languageId },
            },
        );
        return affectedRows;
    },
    delete: async (uid) => {
        const deletedCount = await db.Language.destroy({
            where: { id: uid },
        });
        return deletedCount;
    },
};
module.exports = LanguageService;
