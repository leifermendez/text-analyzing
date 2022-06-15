"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadCSV = void 0;
const fs_1 = require("fs");
const csv_parse_1 = require("csv-parse");
const PATH = `${process.cwd()}/test1.csv`;
/**
 *
 */
class ReadCSV {
    constructor(generalQueue) {
        this.generalQueue = generalQueue;
        console.log("ReadCSV Class Init");
    }
    readFile() {
        (0, fs_1.createReadStream)(PATH)
            .on("error", () => {
            console.log(`--------------------OCURRIO UN ERROR LEYENDO EL CSV-------------------`);
        })
            .pipe((0, csv_parse_1.parse)())
            .on("data", (row) => {
            this.generalQueue.addToQueue(row);
            // console.log(row[1])
        })
            .on("end", () => {
            console.log(`-------------------TODO BIEN-------------------`);
        });
    }
}
exports.ReadCSV = ReadCSV;
