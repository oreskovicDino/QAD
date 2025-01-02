"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCreatedResponseDTO = void 0;
class UserCreatedResponseDTO {
    constructor(model) {
        if (model) {
            this.appUserId = model.appUserId;
            this.customToken = model.customToken;
        }
    }
}
exports.UserCreatedResponseDTO = UserCreatedResponseDTO;
