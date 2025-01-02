import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Question } from "./Question";
import { User } from "./User";

@Entity()
export class Reply {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ type: 'text' })
    body!: string;
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
    @ManyToOne(() => User, user => user.replies, { onDelete: 'NO ACTION' })
    user!: User;
    @ManyToOne(() => Question, question => question.replies, { onDelete: 'NO ACTION' })
    question!: Question;
    @ManyToOne(() => Reply, reply => reply.children, { nullable: true })
    parent!: Reply;
    @OneToMany(() => Reply, reply => reply.parent)
    children!: Reply[];
}