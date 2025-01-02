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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const User_1 = require("../entities/User");
const data_source_1 = require("../config/data-source");
const firebase_1 = __importDefault(require("../utils/firebase"));
const Result_1 = require("../utils/Result");
const UserCreatedResponseDTO_1 = require("../models/UserCreatedResponseDTO");
class UserService {
    constructor() {
        this.userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield this.userRepository.find();
            return Result_1.Result.new(users);
        });
    }
    createUserFromEmail(userBM) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkIfEmailExists(userBM.email))
                return Result_1.Result.newError(409, "This email address is already being used.");
            if (yield this.checkIfUsernameExists(userBM.username))
                return Result_1.Result.newError(409, "This username already exists.");
            return yield firebase_1.default.auth().createUser({
                email: userBM.email,
                password: userBM.password,
                displayName: userBM.username,
            }).then((userRecord) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const user = new User_1.User();
                user.email = userBM.email;
                user.username = userBM.username;
                user.firebaseId = userRecord.uid;
                const newUser = yield this.createAppUser(user);
                const customToken = yield firebase_1.default.auth().createCustomToken(userRecord.uid);
                const responseDto = new UserCreatedResponseDTO_1.UserCreatedResponseDTO();
                responseDto.appUserId = (_a = newUser.data) === null || _a === void 0 ? void 0 : _a.id;
                responseDto.customToken = customToken;
                return Result_1.Result.new(responseDto);
            })).catch(error => {
                return Result_1.Result.newError(500, "User creation failed");
            });
        });
    }
    createUserFromProvider(userBM, firebaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkIfEmailExists(userBM.email)) {
                firebase_1.default.auth().deleteUser(firebaseId).catch(error => console.error("Error deleting user:", error.message));
                return Result_1.Result.newError(409, "This email address is already being used.");
            }
            if (yield this.checkIfUsernameExists(userBM.username)) {
                firebase_1.default.auth().deleteUser(firebaseId);
                return Result_1.Result.newError(409, "This username already exists.");
            }
            ;
            const user = new User_1.User();
            user.email = userBM.email;
            user.username = userBM.username;
            user.firebaseId = firebaseId;
            return yield this.createAppUser(user);
        });
    }
    createUserFromProviderLogin(userBM, firebaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.checkIfFirebaseUserExistsInApp(firebaseId)) {
                return Result_1.Result.new(false);
            }
            if (yield this.checkIfEmailExists(userBM.email)) {
                firebase_1.default.auth().deleteUser(firebaseId).catch(error => console.error("Error deleting user:", error.message));
                return Result_1.Result.newError(409, "This email address is already being used on another account.");
            }
            if (yield this.checkIfUsernameExists(userBM.username)) {
                firebase_1.default.auth().deleteUser(firebaseId);
                return Result_1.Result.newError(409, "This username already exists.");
            }
            ;
            const user = new User_1.User();
            user.email = userBM.email;
            user.username = userBM.username;
            user.firebaseId = firebaseId;
            yield this.createAppUser(user);
            return Result_1.Result.new(true);
        });
    }
    removeUser(uid) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!uid)
                return Result_1.Result.newError(400, "Request not valid");
            try {
                yield firebase_1.default.auth().deleteUser(uid);
                yield this.userRepository
                    .createQueryBuilder()
                    .delete()
                    .where("firebaseId = :firebaseId", { firebaseId: uid })
                    .execute();
                return Result_1.Result.new(true);
            }
            catch (err) {
                throw err;
            }
        });
    }
    createAppUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.userRepository.save(user)
                .then(newUser => {
                return Result_1.Result.new(newUser);
            })
                .catch(error => {
                firebase_1.default.auth().deleteUser(user.email);
                return Result_1.Result.newError(500, "App user creation failed");
            });
        });
    }
    checkIfEmailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { email: email } });
            return user ? true : false;
        });
    }
    checkIfUsernameExists(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { username: username } });
            return user ? true : false;
        });
    }
    checkIfFirebaseUserExistsInApp(firebaseId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { firebaseId: firebaseId } });
            console.log("checkIfFirebaseUserExistsInApp", user);
            return user ? true : false;
        });
    }
}
exports.UserService = UserService;
