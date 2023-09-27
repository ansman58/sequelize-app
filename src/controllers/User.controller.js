const { User, Events } = require("../models/index");
const ControllerResponse = require("../utils/controllerResponse");

class UserController {
  static async store(req, res) {
    try {
      const { name, email, avatar } = req.body;
      const user = await User.create({ name, email, avatar });

      const response = new ControllerResponse({
        response: res,
        message: "User created successfully",
      });

      response.send(user, "created");
    } catch (error) {
      UserController.errorHandler(error, res);
    }
  }

  static async index(req, res) {
    try {
      const users = await User.findAndCountAll({
        attributes: ["id", "name", "email", "avatar"],
        include: [{ model: Events }],
      });

      const response = new ControllerResponse({
        response: res,
        message: "Users retrieved successfully",
      });

      response.send({ users });
    } catch (error) {
      UserController.errorHandler(error, res);
    }
  }

  static async show(req, res) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return ControllerResponse.handleBadRequest(
          res,
          "Please provide a valid id"
        );
      }

      const user = await User.findByPk(userId, {
        attributes: ["id", "name", "email", "avatar"],
        include: [{ model: Events }],
      });

      const response = new ControllerResponse({
        response: res,
        message: "User retrieved successfully",
      });

      response.handleNotFound(user);
    } catch (error) {
      UserController.errorHandler(error, res);
    }
  }

  static async update(req, res) {
    try {
      const userId = req.params.id;
      const { name, email, avatar } = req.body;

      if (!userId) {
        return ControllerResponse.handleBadRequest(
          res,
          "Please provide a valid id"
        );
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return ControllerResponse.handleNotFound(res, "User not found");
      }

      const updatedUser = await user.update({ name, email, avatar });

      const response = new ControllerResponse({
        response: res,
        message: "User updated successfully",
      });

      response.send({ updatedUser });
    } catch (error) {
      UserController.errorHandler(error, res);
    }
  }

  static async destroy(req, res) {
    try {
      const userId = req.params.id;

      if (!userId) {
        return ControllerResponse.handleBadRequest(
          res,
          "Please provide a valid id"
        );
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return ControllerResponse.handleNotFound(res, "User not found");
      }

      await user.destroy();

      const response = new ControllerResponse({
        response: res,
        message: "User deleted successfully",
      });

      response.send();
    } catch (error) {
      UserController.errorHandler(error, res);
    }
  }

  static errorHandler(error, res) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = UserController;
