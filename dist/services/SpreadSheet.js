"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpreadSheet = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const google_spreadsheet_1 = require("google-spreadsheet");
dotenv_1.default.config();
class SpreadSheet {
    constructor() { }
    async init() {
        this.document = new google_spreadsheet_1.GoogleSpreadsheet(`${process.env.SPREADSHEET_ID}`);
        await this.document.useServiceAccountAuth({
            client_email: `${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`,
            private_key: `${process.env.GOOGLE_PRIVATE_KEY}`.replace(/\\n/g, "\n"),
        });
        await this.document.loadInfo();
        this.sheet = this.document.sheetsByIndex[0];
    }
    async addRows(data) {
        let dataArray = [];
        const dataExample = {
            asunto: 'data["Asunto"]',
            cuerpo: 'data["Cuerpo"]',
            de_nombre: 'data["De: (nombre)"]',
            de_direccion: 'data["De: (dirección)"]',
            para_nombre: 'data["Para: (nombre)"]',
            para_direccion: 'data["Para: (dirección)"]',
            cc_nombre: 'data["CC: (nombre)"]',
            cc_direccion: 'data["CC: (dirección)"]',
            event: "data.event",
            person: "data.person",
            location: "data.location",
            date: "data.date",
        };
        dataArray.push(dataExample);
        await this.sheet.addRows(dataArray);
    }
}
exports.SpreadSheet = SpreadSheet;
