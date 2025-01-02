import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import { QuestionController } from "../controllers/QuestionController";
import { QuestionService } from "../services/QuestionService";

const router = Router();

/// USER ROUTES
const userController =  new UserController(new UserService());
userController.registerRoutes(router);

// Question Routes
const questionController = new QuestionController(new QuestionService());
questionController.registerRoutes(router);

export default router;