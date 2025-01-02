"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
require("dotenv").config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.PSQL_HOST,
    port: parseInt(process.env.PSQL_PORT || "5432", 10),
    username: process.env.PSQL_USER,
    password: process.env.PSQL_PASS,
    database: process.env.PSQL_DB,
    synchronize: false,
    logging: true,
    entities: [__dirname + "/../entities/*.ts"],
    migrations: [__dirname + "/../migrations/*.ts"],
});
// running migration generate in bash-> npm run orm-g -- CreateUserTable
// running migration generate in powershell -> npm run pw-orm-g --name=CreateUserTable
