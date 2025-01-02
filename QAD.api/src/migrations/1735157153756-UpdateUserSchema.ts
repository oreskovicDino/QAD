import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserSchema1735157153756 implements MigrationInterface {
    name = 'UpdateUserSchema1735157153756'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fireId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "firebaseId" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_4d8f69fd9538c19d3a42518feac" UNIQUE ("firebaseId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "user" ADD "balance" numeric(10,2)`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('Admin', 'User', 'Guest')`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'User'`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_4d8f69fd9538c19d3a42518feac"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firebaseId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "fireId" character varying NOT NULL`);
    }

}
