const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/config");
const Events = require("./Events");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Please enter a valid email address",
        },
      },
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },
  { sequelize }
);

module.exports = User;
