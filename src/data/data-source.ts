import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Mail } from "../entity/mail.entity";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: false,
  entities: [Mail],
  subscribers: [],
  migrations: [],
});
