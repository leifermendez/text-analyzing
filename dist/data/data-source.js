"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const mail_entity_1 = require("../entity/mail.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "webpublica",
    synchronize: true,
    logging: false,
    entities: [mail_entity_1.Mail],
    subscribers: [],
    migrations: [],
});
