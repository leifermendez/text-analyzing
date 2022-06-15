import Queue from "bull";
import { GeneralProcceses } from "../processes/GeneralProcesses";

export class GeneralQueue {
  scrapperQueue: Queue.Queue<any>;
  constructor(private readonly generalProcesses: GeneralProcceses) {
    this.scrapperQueue = new Queue("parse_queue");
    this.scrapperQueue.process(this.generalProcesses.process);
  }

  public addToQueue(data: any): any {
    this.scrapperQueue.add(
      data,
      {
        attempts: 1,
      }
    );
  }
}
