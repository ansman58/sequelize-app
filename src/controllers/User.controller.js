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

      const response = new ControllerResponse(res);

      if (!userId) {
        return response.handleBadRequest("Please provide a valid id");
      }

      const user = await User.findByPk(userId, {
        attributes: ["id", "name", "email", "avatar"],
        include: [{ model: Events }],
      });

      if (!user) {
        return response.handleNotFound("User not found");
      }

      response.send(user);
    } catch (error) {
      UserController.errorHandler(error, res);
    }
  }

  static async update(req, res) {
    const response = new ControllerResponse(res);
    try {
      const userId = req.params.id;
      const { name, email, avatar } = req.body;

      if (!userId) {
        return response.handleBadRequest("Please provide a valid id");
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return response.handleNotFound("User not found");
      }

      const updatedUser = await user.update({ name, email, avatar });

      response.send(updatedUser, "User updated successfully");
    } catch (error) {
      UserController.errorHandler(error, res);
    }
  }

  static async destroy(req, res) {
    const response = new ControllerResponse(res);

    try {
      const userId = req.params.id;

      if (!userId) {
        return response.handleBadRequest("Please provide a valid id");
      }

      const user = await User.findByPk(userId);

      if (!user) {
        return response.handleNotFound("User not found");
      }

      await user.destroy();

      response.send(null, "User deleted successfully");

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
