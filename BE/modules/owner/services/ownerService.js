const db = require("models");
const { where } = require("sequelize");

const ownerService = {
  create: async ({
    user_id,
    title,
    content,
    image,
    author,
    category_id,
    status,
    is_stock,
  }) => {
    const data = await db.Post.create({
      user_id,
      title,
      content,
      image,
      author,
      category_id,
      status,
      is_stock,
    });
    return data;
  },
  findById: async (id) => {
    const data = await db.Post.findOne({
      raw: true,
      where: { id },
  })
    return data;
  },
  update: async ({id,...data}) => {
    const row = await db.Post.update(data,{
      raw: true,
      where: { id },
  })
    return row;
  },
  delete: async (id) => {
    const row = await db.Post.update(data,{
      raw: true,
      where: { id },
  })
    return row;
  },
};
module.exports = ownerService;
