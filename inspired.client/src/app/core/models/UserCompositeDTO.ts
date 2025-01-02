import { User, UserCredential } from "firebase/auth";
import { UserDTO } from "./UserDTO";

export interface IUserCompositeDTO {
    appUser: UserDTO;
    firebaseUser: User;
}

export class UserCompositeDTO {
    appUser!: UserDTO;
    firebaseUser!: User;
    constructor(model?: IUserCompositeDTO) {
        if (model) {
            this.appUser = model.appUser;
            this.firebaseUser = model.firebaseUser;
        }
    }
}