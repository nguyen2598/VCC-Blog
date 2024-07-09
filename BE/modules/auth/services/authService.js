const db = require("models");
const { where } = require("sequelize");
const argon2 = require("argon2");
const jwtUtils = require("utils/jwtUtils");
const mailUtils = require("utils/mailUtils");
const authService = {
  create: async ({ username, password, email }) => {
    console.log({ username, password, email });

    const hashPassword = await argon2.hash(password);
    const data = await db.User.create({
      username,
      password: hashPassword,
      email,
    });
    const access_token = jwtUtils.sign(data.id, data.role);
    const refresh_token = jwtUtils.signRefreshToken(data.id, data.role);
    return {
      username: data.username,
      email: data.email,
      access_token,
      refresh_token,
    };
  },
  login: async ({ password, email }) => {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("Email not found");
    }

    const passwordValid = await argon2.verify(user.password, password);
    if (passwordValid) {
      const access_token = jwtUtils.sign(user.id, user.role);
      const refresh_token = jwtUtils.signRefreshToken(user.id, user.role);
      return {
        username: user.username,
        email: user.email,
        access_token,
        refresh_token,
      };
    } else {
      throw new Error("Incorrect password");
    }
  },
  sendMail: async (email) => {
    const dataSendMail = mailUtils.generateCode();
    
    const user = await db.User.update(
      { ext: JSON.stringify(dataSendMail) },
      {
        where: {
          email,
        },
      }
    );
    console.log({user:user[0]});
    if (user[0]===0) {
      throw new Error("Email not found");
    }
    
    mailUtils.sendMail(email,dataSendMail.code)
    return "Email is valid"+JSON.stringify(dataSendMail);
  },
  resetPassword: async ({ email, code, newPassword }) => {
    let dataCode = await db.User.findOne({
      where: {
        email,
      },
      attributes: ["ext"],
    });
    if (!dataCode) {
      throw new Error("Email not found");
    }
    if(dataCode?.ext){

      dataCode = JSON.parse(dataCode?.ext);
      if (dataCode.code === code) {
        if (Date.now() <= dataCode?.expiration) {
          const user = await db.User.update(
            { password: newPassword,ext:null },
            {
              where: {
                email,
              },
            }
          );
          return "Password reset successful";
        } else {
          throw new Error("The verification code has expired.");
        }
      } else {
        throw new Error("Incorrect verification code.");
      }
    }
    else{
      throw new Error("Code does not exist")
    }
  },
  getRefreshToken: async ({ id }) => {
    const data = await db.User.findOne({
      where: {
        id,
      },
      attributes: ["refreshToken"],
    });
    const access_token = jwtUtils.sign(data.id, data.role);
    console.log({ data });
    return data;
  },
};
module.exports = authService;
