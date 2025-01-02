import { NextFunction, Request, Response, RequestHandler } from "express";
import { DecodedIdToken } from "firebase-admin/auth";
import admin from "firebase-admin";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";
export interface CustomRequest extends Request {
    user?: DecodedIdToken;
    client?: User;
}

export const verifyFirebaseToken: RequestHandler = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        res.status(401).send('Unauthorized');
        return;
    }

    const token = authorizationHeader.split('Bearer ')[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        if(!decodedToken?.email_verified) throw Error("User email is not verified");
        req.user = decodedToken;
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({ where: { firebaseId: decodedToken.uid } });
        if (user) req.client = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).send('Unauthorized');
    }
};