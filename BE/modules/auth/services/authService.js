const db = require("models")
const { where } = require("sequelize")

const authService = {
    create: async({username, password, email}) => {
      const data = await db.Users.create({
        username, password, email
      })
      return ({username:data.username, email:data.email});
    },
    login: async({ password, email}) => {
      const data = await db.Users.findOne({
        where: {
          password, email
        }
    })
    console.log({data});
      return data
    }
}
module.exports = authService