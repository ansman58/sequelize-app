const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/config");

class Images extends Model {}

Images.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize }
);

module.exports = Images;
