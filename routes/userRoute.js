const express = require("express");
const verifyToken = require("../middleware/auth");
const {createUser, loginUser, getUsers, getUserById, updateUser, deleteUser} = require("../controller/userController");

const route = express.Router();

route.post("/register", createUser);
route.post("/login", loginUser);

route.post("/user", createUser);
route.get("/users", verifyToken, getUsers);
route.get("/user/:id", verifyToken, getUserById);
route.put("/user/update/:id", verifyToken, updateUser);
route.delete("/user/delete/:id", verifyToken, deleteUser);

module.exports = route;