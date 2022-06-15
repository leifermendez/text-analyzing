import Queue from "bull";
import { GeneralProcceses } from "../processes/GeneralProcesses";
export declare class GeneralQueue {
    private readonly generalProcesses;
    scrapperQueue: Queue.Queue<any>;
    constructor(generalProcesses: GeneralProcceses);
    addToQueue(data: any): any;
}
