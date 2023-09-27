const UserController = require("../controllers/User.controller");
const express = require("express");

const router = express.Router();

router.post("/", UserController.store);
router.get("/", UserController.index);

module.exports = router;
