const UserController = require("../controllers/User.controller");
const express = require("express");

const router = express.Router();

router.post("/", UserController.store);
router.get("/", UserController.index);
router.get("/:id", UserController.show);
router.patch("/:id", UserController.update);
router.delete("/:id", UserController.destroy);

module.exports = router;
