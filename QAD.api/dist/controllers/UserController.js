"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    getAllUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userService.getAllUsers();
                res.status(200).send(result.data);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    createUserFromEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userBM = req.body;
                const result = yield this.userService.createUserFromEmail(userBM);
                if (result.success) {
                    res.status(201).send(result.data);
                    return;
                }
                res.status(result.responseCode).send(result.errors);
            }
            catch (error) {
                res.status(500).send({ message: "Internal Server Error" });
            }
        });
    }
    createUserFromProvider(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userBM = req.body;
                const result = yield this.userService.createUserFromProvider(userBM, req.user.uid);
                if (result.success) {
                    res.status(201).send(result.data);
                    return;
                }
                res.status(result.responseCode).send(result.errors);
            }
            catch (error) {
                res.status(500).send({ message: "Internal Server Error" });
            }
        });
    }
    createUserFromProviderLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userBM = req.body;
                const result = yield this.userService.createUserFromProviderLogin(userBM, req.user.uid);
                if (result.success) {
                    res.status(201).send(result.data);
                    return;
                }
                res.status(result.responseCode).send(result.errors);
            }
            catch (error) {
                res.status(500).send({ message: "Internal Server Error" });
            }
        });
    }
    removeUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const result = yield this.userService.removeUser((_a = req.user) === null || _a === void 0 ? void 0 : _a.uid);
                if (result.success) {
                    res.status(result.responseCode).send(result.data);
                    return;
                }
                res.status(result.responseCode).send(result.data);
            }
            catch (error) {
                res.status(500).send({ message: "Internal Server Error" });
            }
        });
    }
    registerRoutes(router) {
        router.get('/users', (req, res) => __awaiter(this, void 0, void 0, function* () { return yield this.getAllUsers(req, res); }));
        router.post('/user/create/provider', (req, res) => __awaiter(this, void 0, void 0, function* () { return yield this.createUserFromProvider(req, res); }));
        router.post('/user/create/provider/login', (req, res) => __awaiter(this, void 0, void 0, function* () { return yield this.createUserFromProviderLogin(req, res); }));
        router.delete('/user/remove', (req, res) => __awaiter(this, void 0, void 0, function* () { return yield this.removeUser(req, res); }));
    }
    registerPublicRoutes(router) {
        router.post('/user/create/email', (req, res) => __awaiter(this, void 0, void 0, function* () { return yield this.createUserFromEmail(req, res); }));
    }
}
exports.UserController = UserController;
