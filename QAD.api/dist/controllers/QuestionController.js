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
exports.QuestionController = void 0;
class QuestionController {
    constructor(questionService) {
        this.questionService = questionService;
        this.questionService = questionService;
    }
    registerRoutes(router) {
        router.post("/questions/create", (req, res) => this.createQuestion(req, res));
        router.get("/questions/user/list", (req, res) => this.getUserQuestions(req, res));
    }
    createQuestion(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const question = yield this.questionService.createQuestion(req.body, req.client.id);
                res.status(201).send(question);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
    getUserQuestions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const questions = yield this.questionService.getUserQuestions(req.client.id);
                res.status(200).send(questions);
            }
            catch (error) {
                res.status(500).send(error);
            }
        });
    }
}
exports.QuestionController = QuestionController;
