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
exports.UpdateUserSchema1735157153756 = void 0;
class UpdateUserSchema1735157153756 {
    constructor() {
        this.name = 'UpdateUserSchema1735157153756';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "fireId"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "firebaseId" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_4d8f69fd9538c19d3a42518feac" UNIQUE ("firebaseId")`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "isActive" boolean NOT NULL DEFAULT true`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "balance" numeric(10,2)`);
            yield queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('Admin', 'User', 'Guest')`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "role" "public"."user_role_enum" NOT NULL DEFAULT 'User'`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "username" character varying(100) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "email" character varying(100) NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "email"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "email" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
            yield queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "balance"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isActive"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_4d8f69fd9538c19d3a42518feac"`);
            yield queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firebaseId"`);
            yield queryRunner.query(`ALTER TABLE "user" ADD "fireId" character varying NOT NULL`);
        });
    }
}
exports.UpdateUserSchema1735157153756 = UpdateUserSchema1735157153756;
