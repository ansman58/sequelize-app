const { User, Events } = require("../models/index");

class UserController {
  static async store(req, res) {
    try {
      const { name, email, avatar } = req.body;
      const user = await User.create({ name, email, avatar });
      return res.status(200).json({
        status: "success",
        message: "User created successfully",
        user,
      });
    } catch (error) {
      UserController.errorHandler(error, res);
    }
  }

  static async index(req, res) {
    try {
      const users = await User.findAndCountAll({
        attributes: ["id", "name", "email", "avatar"],
        include: [
          {
            model: Events,
          },
        ],
      });
      res.status(200).send({ status: "success", users });
    } catch (error) {
      UserController.errorHandler(error, res);
    }
  }

  static async show(req, res) {
    try {
      if (!req.params.id) {
        return res
          .status(400)
          .json({ status: "failed", error: "Please provide a valid id" });
      }
      const user = await User.findByPk(req.params.id, {
        attributes: ["id", "name", "email", "avatar"],
        include: [
          {
            model: Events,
          },
        ],
      });
      return res.status(200).send({ status: "success", user });
    } catch (error) {
      UserController.errorHandler(error, res);
    }
  }

  static async update(req, res) {
    try {
      const { name, email, avatar } = req.body;

      if (!req.params.id) {
        return res
          .status(400)
          .json({ status: "failed", error: "Please provide a valid id" });
      }

      const user = await User.findByPk(req.params.id);

      const updated_user = await user.update({ name, email, avatar });
      return res.status(200).send({
        status: "success",
        message: "User updated successfully",
        updated_user,
      });
    } catch (error) {
      UserController.errorHandler(error, res);
    }
  }

  static async destroy(req, res) {
    try {
      if (!req.params.id) {
        return res
          .status(400)
          .json({ status: "failed", error: "Please provide a valid id" });
      }
      const user = await User.findByPk(req.params.id);
      const delteUser = await user.destroy();
      return res.status(200).send({
        status: "success",
        message: "User deleted successfully",
        delteUser,
      });
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
