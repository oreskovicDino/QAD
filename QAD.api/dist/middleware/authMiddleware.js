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
exports.verifyFirebaseToken = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const data_source_1 = require("../config/data-source");
const User_1 = require("../entities/User");
const verifyFirebaseToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        res.status(401).send('Unauthorized');
        return;
    }
    const token = authorizationHeader.split('Bearer ')[1];
    try {
        const decodedToken = yield firebase_admin_1.default.auth().verifyIdToken(token);
        if (!(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.email_verified))
            throw Error("User email is not verified");
        req.user = decodedToken;
        const userRepository = data_source_1.AppDataSource.getRepository(User_1.User);
        const user = yield userRepository.findOne({ where: { firebaseId: decodedToken.uid } });
        if (user)
            req.client = user;
        next();
    }
    catch (error) {
        console.error(error);
        res.status(401).send('Unauthorized');
    }
});
exports.verifyFirebaseToken = verifyFirebaseToken;
