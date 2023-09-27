const { User, Events } = require("../models/index");

class UserController {
  static async store(req, res) {
    try {
      const { name, email, avatar } = req.body;
      const user = await User.create({ name, email, avatar });
      return res.json(user);
    } catch (error) {
      UserController.errorHandler(error, res);
    }
  }

  static async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["id", "name", "email", "avatar"],
        include: [
          {
            model: Events,
          },
        ],
      });
      res.status(200).send(users);
    } catch (error) {
      UserController.errorHandler(error, res);
    }
  }

  static errorHandler(error, res) {
    if (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
