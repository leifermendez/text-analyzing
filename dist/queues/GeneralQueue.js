"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralQueue = void 0;
const bull_1 = __importDefault(require("bull"));
class GeneralQueue {
    constructor(generalProcesses) {
        this.generalProcesses = generalProcesses;
        this.scrapperQueue = new bull_1.default("parse_queue");
        this.scrapperQueue.process(this.generalProcesses.process);
    }
    addToQueue(data) {
        this.scrapperQueue.add(data, {
            attempts: 1,
        });
    }
}
exports.GeneralQueue = GeneralQueue;
