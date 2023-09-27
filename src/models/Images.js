const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/config");

class Image extends Model {}

Image.init(
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
