"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserService_1 = require("../services/UserService");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
/// USER ROUTES
const userController = new UserController_1.UserController(new UserService_1.UserService());
userController.registerPublicRoutes(router);
exports.default = router;
