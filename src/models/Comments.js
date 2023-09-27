const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/config");

class Comments extends Model {}

Comments.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    body: {
      type: DataTypes.TEXT,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    event_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
  }
);

module.exports = Comments;
