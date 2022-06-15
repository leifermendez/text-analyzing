import { GeneralQueue } from "../queues/GeneralQueue";
/**
 *
 */
export declare class ReadCSV {
    private readonly generalQueue;
    constructor(generalQueue: GeneralQueue);
    readFile(): void;
}
