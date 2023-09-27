const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/config");

class Groups extends Model {}

Groups.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Groups;
