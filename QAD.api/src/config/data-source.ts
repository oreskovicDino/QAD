import "reflect-metadata";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
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