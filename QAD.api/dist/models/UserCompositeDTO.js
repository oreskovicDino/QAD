"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCompositeDTO = void 0;
class UserCompositeDTO {
    constructor(model) {
        if (model) {
            this.appUser = model.appUser;
            this.firebaseUser = model.firebaseUser;
        }
    }
}
exports.UserCompositeDTO = UserCompositeDTO;
