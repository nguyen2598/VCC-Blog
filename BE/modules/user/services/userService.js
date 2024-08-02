const db = require('models');
const userService = {
    findAndCountAll: async ({ page = 1, limit = 10, key, status }) => {
        let whereQuery = {};
        if (!(key === '' || !key)) {
            // key = undefined;
            whereQuery.username = {
                [db.Sequelize.Op.like]: `%${key}%`, // Tìm kiếm chuỗi `key` trong tên người dùng
            };
        }
        // if (status === '' || !status || status === 'all') {
        //     status = undefined;
        // }
        let paranoidOption = false; // Mặc định là tìm kiếm tất cả các bản ghi, bao gồm cả các bản bị xóa mềm

        if (status === 'disable') {
            paranoidOption = false; // Tìm kiếm các bản ghi đã bị xóa mềm
            whereQuery.destroyTime = { [db.Sequelize.Op.not]: null };
        } else if (status === 'enable') {
            paranoidOption = true; // Chỉ tìm kiếm các bản ghi chưa bị xóa mềm
        }
        console.log({ page, limit, key, status });
        const users = await db.User.findAndCountAll({
            // raw: true,
            // nest: true,
            where: whereQuery,
            paranoid: paranoidOption, // Tùy chọn paranoid
            limit: +limit,
            offset: (+page - 1) * +limit,
            attributes: [
                'id',
                'username',
                'email',
                ['createdAt', 'created_at'], // cachs đổi tên
                ['updatedAt', 'updated_at'],
                'destroyTime',
            ],
            include: [
                {
                    // Nếu có quan hệ với bảng khác
                    model: db.Role,
                    as: 'role',
                    attributes: ['role_name', 'description'],
                },
            ],
        });
        return users;
    },
    delete: async (uid) => {
        const deletedCount = await db.User.destroy({
            where: { id: uid },
        });
        return deletedCount;
    },
    restore: async (uid) => {
        const restoredCount = await db.User.restore({
            where: { id: uid },
        });
        return restoredCount;
    },
};
module.exports = userService;
