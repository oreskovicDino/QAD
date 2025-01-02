export interface IUserCreatedResponseDTO {
    appUserId: number;
    customToken: string;
}

export class UserCreatedResponseDTO {
    appUserId!: number;
    customToken!: string;
    constructor(model?: IUserCreatedResponseDTO) {
        if (model) {
            this.appUserId = model.appUserId;
            this.customToken = model.customToken;
        }
    }
}