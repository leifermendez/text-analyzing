"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UseCase_1 = require("./services/UseCase");
require("reflect-metadata");
const GeneralProcesses_1 = require("./processes/GeneralProcesses");
const GeneralQueue_1 = require("./queues/GeneralQueue");
const SpreadSheet_1 = require("./services/SpreadSheet");
const NaturalLanguage_1 = require("./services/NaturalLanguage");
const ReadCSV_1 = require("./services/ReadCSV");
const data_source_1 = require("./data/data-source");
class MainApp {
    constructor(readCsv) {
        this.readCsv = readCsv;
    }
    async initData() {
        try {
            await data_source_1.AppDataSource.initialize();
        }
        catch (e) {
            console.log("error", e);
        }
    }
    start() {
        console.log("Iniciar");
        this.initData();
        this.readCsv.readFile();
    }
}
/**
 * Services
 */
const naturalLanguage = new NaturalLanguage_1.NaturalLanguage();
const spreadSheet = new SpreadSheet_1.SpreadSheet();
const useCase = new UseCase_1.UseCase();
const generalProcess = new GeneralProcesses_1.GeneralProcceses(naturalLanguage, spreadSheet, useCase);
const generalQueue = new GeneralQueue_1.GeneralQueue(generalProcess);
const readCSV = new ReadCSV_1.ReadCSV(generalQueue);
/**
 * Inicamos APP
 */
const app = new MainApp(readCSV);
app.start();
// naturalLanguage.analyzing('The Node.js stream API is scalable and offers the greatest control over the data flow. It comes at the cost of being more verbose and harder to write. Data is consumed inside the readable event with the stream.read function. It is then written by calling the stream.write fun')
