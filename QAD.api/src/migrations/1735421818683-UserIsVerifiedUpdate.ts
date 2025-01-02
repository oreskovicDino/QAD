import { MigrationInterface, QueryRunner } from "typeorm";

export class UserIsVerifiedUpdate1735421818683 implements MigrationInterface {
    name = 'UserIsVerifiedUpdate1735421818683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "balance" TO "isVerified"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerified"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isVerified" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerified"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isVerified" numeric(10,2)`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "isVerified" TO "balance"`);
    }

}
