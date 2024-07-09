const db = require("models");
const userService = {
  findAndCountAll: async ({ page = 1, limit = 10 }) => {
    const users = await db.User.findAndCountAll({
      // raw: true,
      // nest: true,
      limit: +limit,
      offset: (+page - 1) * +limit,
      attributes: [
        "id",
        "username",
        "email",
        ["createdAt", "created_at"],// cachs đổi tên
        ["updatedAt", "updated_at"],
      ],
      include: [
        {
          // Nếu có quan hệ với bảng khác
          model: db.Role,
          as: "role",
          attributes: ["role_name", "description"],
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
};
module.exports = userService;
