import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Question } from "./Question";
import { Reply } from "./Reply";

@Entity()
export class User {
    @PrimaryGeneratedColumn() // Auto-incrementing primary key
    id!: number;

    @Column({ type: 'varchar', unique: true, nullable: false })
    firebaseId!: string; // Firebase UID

    @Column({ type: 'varchar', length: 100 })
    username!: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    email!: string;

    @Column({ type: 'boolean', default: true })
    isActive!: boolean;

    @Column({ type: 'enum', enum: ['Admin', 'User', 'Guest'], default: 'User' })
    role!: string;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @OneToMany(() => Question, (question) => question.user)
    questions!: Question[];

    @OneToMany(() => Reply, (reply) => reply.user)
    replies!: Reply[];
}