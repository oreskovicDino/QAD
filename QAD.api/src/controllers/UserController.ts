import { Router } from "express";
import { UserService } from "../services/UserService";
import { UserRegisterBM } from "../models/UserRegisterBM";

export class UserController {
    constructor(private userService: UserService) { }
    private async getAllUsers(req: any, res: any): Promise<void> {
        try {
            const result = await this.userService.getAllUsers();
            res.status(200).send(result.data);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    private async createUserFromEmail(req: any, res: any): Promise<void> {
        try {
            const userBM = req.body as UserRegisterBM;
            const result = await this.userService.createUserFromEmail(userBM);
            if (result.success) {
                res.status(201).send(result.data);
                return;
            }
            res.status(result.responseCode).send(result.errors);
        } catch (error) {
            res.status(500).send({ message: "Internal Server Error" });
        }
    }

    private async createUserFromProvider(req: any, res: any): Promise<void> {
        try {
            const userBM = req.body as UserRegisterBM;
            const result = await this.userService.createUserFromProvider(userBM, req.user.uid);
            if (result.success) {
                res.status(201).send(result.data);
                return;
            }
            res.status(result.responseCode).send(result.errors);
        } catch (error) {
            res.status(500).send({ message: "Internal Server Error" });
        }
    }

    private async createUserFromProviderLogin(req: any, res: any): Promise<void> {
        try {
            const userBM = req.body as UserRegisterBM;
            const result = await this.userService.createUserFromProviderLogin(userBM, req.user.uid);
            if (result.success) {
                res.status(201).send(result.data);
                return;
            }
            res.status(result.responseCode).send(result.errors);
        } catch (error) {
            res.status(500).send({ message: "Internal Server Error" });
        }
    }

    private async removeUser(req: any, res: any): Promise<void> {
        try {
            const result = await this.userService.removeUser(req.user?.uid);
            if (result.success) {
                res.status(result.responseCode).send(result.data);
                return;
            }
            res.status(result.responseCode).send(result.data);
        } catch (error) {
            res.status(500).send({ message: "Internal Server Error" });
        }
    }

    public registerRoutes(router: Router): void {
        router.get('/users', async (req, res) => await this.getAllUsers(req, res));
        router.post('/user/create/provider', async (req, res) => await this.createUserFromProvider(req, res));
        router.post('/user/create/provider/login', async (req, res) => await this.createUserFromProviderLogin(req, res));
        router.delete('/user/remove', async (req, res) => await this.removeUser(req, res));
    }

    public registerPublicRoutes(router: Router): void {
        router.post('/user/create/email', async (req, res) => await this.createUserFromEmail(req, res));
    }
}