import { UserRecord } from "firebase-admin/auth";
import { User } from "../entities/User";

export interface IUserCompositeDTO {
    appUser: User;
    firebaseUser: UserRecord;
}

export class UserCompositeDTO {
    appUser!: User;
    firebaseUser!: UserRecord;
    constructor(model?: IUserCompositeDTO) {
        if (model) {
            this.appUser = model.appUser;
            this.firebaseUser = model.firebaseUser;
        }
    }
}