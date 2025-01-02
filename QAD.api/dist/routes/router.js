"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const UserService_1 = require("../services/UserService");
const QuestionController_1 = require("../controllers/QuestionController");
const QuestionService_1 = require("../services/QuestionService");
const router = (0, express_1.Router)();
/// USER ROUTES
const userController = new UserController_1.UserController(new UserService_1.UserService());
userController.registerRoutes(router);
// Question Routes
const questionController = new QuestionController_1.QuestionController(new QuestionService_1.QuestionService());
questionController.registerRoutes(router);
exports.default = router;
