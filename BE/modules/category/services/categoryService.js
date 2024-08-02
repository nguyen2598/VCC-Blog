const db = require('models');
const authService = {
    findAll: async () => {
        const Categories = await db.Category.findAll({
            raw: true,
            nest: true,
            attributes: ['id', 'name', ['createdAt', 'created_at'], ['updatedAt', 'updated_at']],
        });
        return Categories;
    },
    findOne: async (categoryId) => {
        const Category = await db.Category.findOne({
            // raw: true,
            // nest: true,
            where: { id: categoryId },
            attributes: ['id', 'name', ['createdAt', 'created_at'], ['updatedAt', 'updated_at']],
        });
        return Category;
    },
    create: async ({ name }) => {
        console.log({ name });
        const newCategory = await db.Category.create({ name });
        return newCategory;
    },
    update: async ({ categoryId, name }) => {
        let [affectedRows] = await db.Category.update(
            { name },
            {
                where: { id: categoryId },
            },
        );
        return affectedRows;
    },
    delete: async (uid) => {
        const deletedCount = await db.Category.destroy({
            where: { id: uid },
        });
        return deletedCount;
    },
};
module.exports = authService;
