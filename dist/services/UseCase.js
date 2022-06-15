"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCase = void 0;
const mail_entity_1 = require("../entity/mail.entity");
class UseCase {
    constructor() {
    }
    async register(data) {
        this.mail = new mail_entity_1.Mail();
        this.mail.asunto = data[0];
        this.mail.cuerpo = data[1];
        this.mail.de_nombre = data[2];
        this.mail.de_direccion = data[3];
        this.mail.para_nombre = data[4];
        this.mail.para_direccion = data[4];
        this.mail.cc_nombre = data[6];
        this.mail.cc_direccion = data[7];
        this.mail.score = data[9];
        this.mail.event = data[10];
        this.mail.other = data[11];
        this.mail.person = data[12];
        this.mail.location = data[13];
        this.mail.date = data[14];
        await this.mail.save();
    }
}
exports.UseCase = UseCase;
