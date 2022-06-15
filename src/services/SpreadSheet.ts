import dotenv from "dotenv";
import { GoogleSpreadsheet } from "google-spreadsheet";

dotenv.config();

export class SpreadSheet {
  document!: GoogleSpreadsheet;
  sheet: any;
  constructor() {}

  public async init() {
    this.document = new GoogleSpreadsheet(`${process.env.SPREADSHEET_ID}`);
    await this.document.useServiceAccountAuth({
      client_email: `${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}`,
      private_key: `${process.env.GOOGLE_PRIVATE_KEY}`.replace(/\\n/g, "\n"),
    });

    await this.document.loadInfo();
    this.sheet = this.document.sheetsByIndex[0];
  }

  public async addRows(data: any) {
    let dataArray: any[] = [];
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
