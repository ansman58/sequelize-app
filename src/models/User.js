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
    },
    avatar: {
      type: DataTypes.STRING,
    },
  },
  { sequelize }
);

User.hasMany(Events);
Events.belongsTo(User, { foreignKey: "creator_id" });

module.exports = User;
