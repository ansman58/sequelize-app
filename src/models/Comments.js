const { DataTypes, Model, Sequelize } = require("sequelize");
const sequelize = require("../config/config");
const User = require("./1-users");
const Events = require("./3-events");
const CommentImages = require("./comment_images");
const Images = require("./4-images");

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