import { Mail } from "./../entity/mail.entity";
import { SpreadSheet } from "./../services/SpreadSheet";
import { DoneCallback, Job } from "bull";
import { GeneralQueue } from "../queues/GeneralQueue";
import { AzureNaturalLanguage } from "../services/AzureNaturalLanguage";
import { UseCase } from "../services/UseCase";

export class GeneralProcceses {
  constructor(
    private readonly naturalLanguage: AzureNaturalLanguage,
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
      const topics = this.naturalLanguage.mapResponse(response)
  
      // const dataParse = [
      //   ...data,
      //   Number(response.analyzeSentiment).toFixed(2),
      //   topics.event.join(),
      //   topics.other.join(),
      //   topics.person.join(),
      //   topics.location.join(),
      //   topics.date.join(),
      // ];
  
      console.log(topics)
      // await this.spreadSheat.addRows(data)
      // this.useCase.register(dataParse);
      done();
    }catch(e){
      done(new Error("ERROR_SKIP"));
    }
  }
}
