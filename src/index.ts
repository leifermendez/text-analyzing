import { UseCase } from './services/UseCase';
import "reflect-metadata";
import { GeneralProcceses } from "./processes/GeneralProcesses";
import { GeneralQueue } from "./queues/GeneralQueue";
import { SpreadSheet } from "./services/SpreadSheet";
import { NaturalLanguage } from "./services/GoogleNaturalLanguage";
import { ReadCSV } from "./services/ReadCSV";
import { AppDataSource } from "./data/data-source";
import { AzureNaturalLanguage } from './services/AzureNaturalLanguage';

class MainApp {
  constructor(private readonly readCsv: ReadCSV) {}

  public async initData() {
    try {
      await AppDataSource.initialize();
    } catch (e) {
      console.log("error", e);
    }
  }

  public start() {
    console.log("Iniciar");
    this.initData();
    this.readCsv.readFile();
  }
}

/**
 * Services
 */

const naturalLanguage = new AzureNaturalLanguage();
const spreadSheet = new SpreadSheet();
const useCase = new UseCase()
const generalProcess = new GeneralProcceses(naturalLanguage, spreadSheet, useCase);
const generalQueue = new GeneralQueue(generalProcess);
const readCSV = new ReadCSV(generalQueue);
/**
 * Inicamos APP
 */
const app = new MainApp(readCSV);
app.start();

// naturalLanguage.analyzing('The Node.js stream API is scalable and offers the greatest control over the data flow. It comes at the cost of being more verbose and harder to write. Data is consumed inside the readable event with the stream.read function. It is then written by calling the stream.write fun')
