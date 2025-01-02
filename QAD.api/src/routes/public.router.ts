import { Router } from "express";
import { UserService } from "../services/UserService";
import { UserController } from "../controllers/UserController";

const router = Router();

/// USER ROUTES
const userController = new UserController(new UserService());
userController.registerPublicRoutes(router);

export default router;
