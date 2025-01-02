import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserIsVerifiedRemoved1735833073753 implements MigrationInterface {
    name = 'UpdateUserIsVerifiedRemoved1735833073753'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isVerified"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isVerified" boolean NOT NULL DEFAULT false`);
    }

}
