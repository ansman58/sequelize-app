const User = require("./User");
const Events = require("./Events");
const Comments = require("./Comments");
const Images = require("./Images");
const Groups = require("./Groups");

User.hasMany(Events);
Events.belongsTo(User, { foreignKey: "creator_id" });

Events.belongsToMany(Images, {
  through: "event_thumbnail",
  foreignKey: "event_id",
});
Images.belongsToMany(Events, {
  through: "event_thumbnail",
  foreignKey: "image_id",
});

Events.hasMany(Comments);
Comments.belongsTo(Events, { foreignKey: "event_id" });

User.hasMany(Comments);
Comments.belongsTo(User, { foreignKey: "user_id" });

Comments.belongsToMany(Images, {
  through: "comment_image",
  foreignKey: "comment_id",
});
Images.belongsToMany(Comments, {
  through: "comment_image",
  foreignKey: "image_id",
});

User.belongsToMany(Groups, { through: "user_groups", foreignKey: "user_id" });
Groups.belongsToMany(User, { through: "user_groups", foreignKey: "group_id" });

Groups.belongsToMany(Events, {
  through: "group_events",
  foreignKey: "group_id",
});
Events.belongsToMany(Groups, {
  through: "group_events",
  foreignKey: "event_id",
});

User.belongsToMany(Events, {
  through: "interested_events",
  foreignKey: "user_id",
});
Events.belongsToMany(User, {
  through: "interested_events",
  foreignKey: "event_id",
});

User.belongsToMany(Comments, { through: "likes", foreignKey: "user_id" });
Comments.belongsToMany(User, { through: "likes", foreignKey: "comment_id" });

Groups.belongsToMany(Images, { through: "group_image", foreignKey: "user_id" });
Images.belongsToMany(Groups, {
  through: "group_image",
  foreignKey: "image_id",
});

module.exports = {
  User,
  Events,
  Comments,
  Images,
  Groups,
};
