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
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const data_source_1 = require("../config/data-source");
const Question_1 = require("../entities/Question");
class QuestionService {
    constructor() {
        this.questionService = data_source_1.AppDataSource.getRepository(Question_1.Question);
        // async getUserUnreadQuestions(userId: number): Promise<Question[]> {
        //     return await this.questionService.find({ where: { user: { id: userId }, read: false } });
        // }
    }
    createQuestion(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            data.user = { id: userId };
            //throw exp.
            const question = this.questionService.create(data);
            return yield this.questionService.save(question);
        });
    }
    getUserQuestions(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.questionService
                .createQueryBuilder("question")
                .leftJoin("question.user", "user")
                .where("question.user.id = :userId", { userId })
                .select(["question.id", "question.title", "question.excerpt"]) // Select specific fields including user.id
                .getMany();
        });
    }
}
exports.QuestionService = QuestionService;
