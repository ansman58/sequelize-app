const { User } = require("../models/index");

class UserController {
  static async store(req, res) {
    const { name, email, avatar } = req.body;
    const user = await User.create({ name, email, avatar });
    return res.json(user);
  }
}

module.exports = UserController;
