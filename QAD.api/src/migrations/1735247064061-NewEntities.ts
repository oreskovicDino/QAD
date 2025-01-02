import { MigrationInterface, QueryRunner } from "typeorm";

export class NewEntities1735247064061 implements MigrationInterface {
    name = 'NewEntities1735247064061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "reply" ("id" SERIAL NOT NULL, "body" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "questionId" integer, "parentId" integer, CONSTRAINT "PK_94fa9017051b40a71e000a2aff9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "title" character varying(250) NOT NULL, "excerpt" character varying(500) NOT NULL, "body" text NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "reply" ADD CONSTRAINT "FK_e9886d6d04a19413a2f0aac5d7b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reply" ADD CONSTRAINT "FK_f223d58bc40d2c56c122e6d4695" FOREIGN KEY ("questionId") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "reply" ADD CONSTRAINT "FK_853da4dcaed90e6881f2d3279c2" FOREIGN KEY ("parentId") REFERENCES "reply"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_80f29cc01d0bd1644e389cc13be" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_80f29cc01d0bd1644e389cc13be"`);
        await queryRunner.query(`ALTER TABLE "reply" DROP CONSTRAINT "FK_853da4dcaed90e6881f2d3279c2"`);
        await queryRunner.query(`ALTER TABLE "reply" DROP CONSTRAINT "FK_f223d58bc40d2c56c122e6d4695"`);
        await queryRunner.query(`ALTER TABLE "reply" DROP CONSTRAINT "FK_e9886d6d04a19413a2f0aac5d7b"`);
        await queryRunner.query(`DROP TABLE "question"`);
        await queryRunner.query(`DROP TABLE "reply"`);
    }

}
