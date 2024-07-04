const db = require("models")
const { where } = require("sequelize")

const userService = {
    findById: async(id) => {
      const data = await db.Users.findOne({
        raw: true,
        where:{id},
        attributes: {
            exclude: ['password'],
        },
      })
      return data;
    }
}