const { User, Events } = require("../models/index");
const ControllerResponse = require("../utils/controllerResponse");

class UserController {
  static async store(req, res) {
    try {
      const { name, email, avatar } = req.body;
      const user = await User.create({ name, email, avatar });

      const response = new ControllerResponse(res);

      response.send(user, "User created successfully", 201);
    } catch (error) {
      response.handleServerError(error);
    }
  }

  static async index(req, res) {
    try {
      const users = await User.findAndCountAll({
        attributes: ["id", "name", "email", "avatar"],
        include: [{ model: Events }],
      });

      const response = new ControllerResponse(res);

      response.send(users, "Users retrieved successfully");
    } catch (error) {
      response.handleServerError(error);
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

      response.send(user, "User retrieved successfully");
    } catch (error) {
      response.handleServerError(error);
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
      response.handleServerError(error);
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
    } catch (error) {
      response.handleServerError(error);
    }
  }
}

module.exports = UserController;
