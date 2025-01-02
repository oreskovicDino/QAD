import { User } from "../entities/User";
import { AppDataSource } from "../config/data-source";
import { Question } from "../entities/Question";

export class QuestionService {
    private questionService = AppDataSource.getRepository(Question);

    async createQuestion(data: Partial<Question>, userId: number): Promise<Question> {
        data.user = { id: userId } as User;
        //throw exp.
        const question = this.questionService.create(data);
        return await this.questionService.save(question);
    }

    async getUserQuestions(userId: number): Promise<Question[]> {
        return await this.questionService
            .createQueryBuilder("question")
            .leftJoin("question.user", "user")
            .where("question.user.id = :userId", { userId })
            .select(["question.id", "question.title", "question.excerpt"]) // Select specific fields including user.id
            .getMany();
    }

    // async getUserUnreadQuestions(userId: number): Promise<Question[]> {
    //     return await this.questionService.find({ where: { user: { id: userId }, read: false } });
    // }
}