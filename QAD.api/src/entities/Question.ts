import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Reply } from "./Reply";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id!: number;
    @Column({ type: 'varchar', length: 250 })
    title!: string;
    @Column({ type: 'varchar', length: 500 })
    excerpt!: string;
    @Column({ type: 'text' })
    body!: string;
    @CreateDateColumn()
    createdAt!: Date;
    @UpdateDateColumn()
    updatedAt!: Date;
    @ManyToOne(() => User, user => user.questions, { onDelete: 'NO ACTION' })
    user!: User;
    @OneToMany(() => Reply, (reply) => reply.question)
    replies!: Reply[];
}