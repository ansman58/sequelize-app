const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

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
