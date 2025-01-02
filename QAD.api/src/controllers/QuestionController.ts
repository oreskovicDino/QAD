import { Router } from "express";
import { QuestionService } from "../services/QuestionService";

export class QuestionController {
    constructor(private questionService: QuestionService) {
        this.questionService = questionService;
    }
    
    registerRoutes(router: Router): void {
        router.post("/questions/create", (req, res) => this.createQuestion(req, res));
        router.get("/questions/user/list", (req, res) => this.getUserQuestions(req, res));
    }

    async createQuestion(req: any, res: any) {
        try {
            const question = await this.questionService.createQuestion(req.body, req.client.id);
            res.status(201).send(question);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getUserQuestions(req: any, res: any) {
        try {
            const questions = await this.questionService.getUserQuestions(req.client.id);
            res.status(200).send(questions);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}