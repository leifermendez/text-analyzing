import { DataSource } from "typeorm";
import { Mail } from "../entity/mail.entity";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "webpublica",
    synchronize: true,
    logging: false,
    entities: [Mail],
    subscribers: [],
    migrations: [],
})