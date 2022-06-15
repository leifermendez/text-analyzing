import { Mail } from "./../entity/mail.entity";
import { SpreadSheet } from "./../services/SpreadSheet";
import { DoneCallback, Job } from "bull";
import { GeneralQueue } from "../queues/GeneralQueue";
import { NaturalLanguage } from "../services/NaturalLanguage";
import { UseCase } from "../services/UseCase";

export class GeneralProcceses {
  constructor(
    private readonly naturalLanguage: NaturalLanguage,
    private spreadSheat: SpreadSheet,
    private useCase: UseCase
  ) {
    this.process = this.process.bind(this);
  }

  async process(job: Job, done: DoneCallback) {
    try{
      const { data } = job;
      const text = data[1];
      const response = await this.naturalLanguage.analyzing(text);
      const topics = {
        event: response.analyzeEntities
          .filter((a: any) => a.type === "EVENT")
          .map((b: any) => b.name),
        other: response.analyzeEntities
          .filter((a: any) => a.type === "OTHER")
          .map((b: any) => b.name),
        person: response.analyzeEntities
          .filter((a: any) => a.type === "PERSON")
          .map((b: any) => b.name),
        date: response.analyzeEntities
          .filter((a: any) => a.type === "DATE")
          .map((b: any) => b.name),
        location: response.analyzeEntities
          .filter((a: any) => a.type === "LOCATION")
          .map((b: any) => b.name),
      };
  
  
      const dataParse = [
        ...data,
        Number(response.analyzeSentiment).toFixed(2),
        topics.event.join(),
        topics.other.join(),
        topics.person.join(),
        topics.location.join(),
        topics.date.join(),
      ];
  
      console.log(dataParse)
      // await this.spreadSheat.addRows(data)
      this.useCase.register(dataParse);
      done();
    }catch(e){
      done(new Error("ERROR_SKIP"));
    }
  }
}
