"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Reply = void 0;
const typeorm_1 = require("typeorm");
const Question_1 = require("./Question");
const User_1 = require("./User");
let Reply = class Reply {
};
exports.Reply = Reply;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Reply.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], Reply.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Reply.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Reply.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.replies, { onDelete: 'NO ACTION' }),
    __metadata("design:type", User_1.User)
], Reply.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Question_1.Question, question => question.replies, { onDelete: 'NO ACTION' }),
    __metadata("design:type", Question_1.Question)
], Reply.prototype, "question", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Reply, reply => reply.children, { nullable: true }),
    __metadata("design:type", Reply)
], Reply.prototype, "parent", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Reply, reply => reply.parent),
    __metadata("design:type", Array)
], Reply.prototype, "children", void 0);
exports.Reply = Reply = __decorate([
    (0, typeorm_1.Entity)()
], Reply);
