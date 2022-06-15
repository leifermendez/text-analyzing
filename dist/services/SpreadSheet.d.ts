import { GoogleSpreadsheet } from "google-spreadsheet";
export declare class SpreadSheet {
    document: GoogleSpreadsheet;
    sheet: any;
    constructor();
    init(): Promise<void>;
    addRows(data: any): Promise<void>;
}
