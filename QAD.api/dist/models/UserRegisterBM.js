"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRegisterBM = void 0;
class UserRegisterBM {
    constructor(model) {
        if (model) {
            this.email = model.email;
            this.password = model.password;
            this.username = model.username;
        }
    }
}
exports.UserRegisterBM = UserRegisterBM;
