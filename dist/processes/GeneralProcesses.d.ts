import { SpreadSheet } from "./../services/SpreadSheet";
import { DoneCallback, Job } from "bull";
import { NaturalLanguage } from "../services/NaturalLanguage";
import { UseCase } from "../services/UseCase";
export declare class GeneralProcceses {
    private readonly naturalLanguage;
    private spreadSheat;
    private useCase;
    constructor(naturalLanguage: NaturalLanguage, spreadSheat: SpreadSheet, useCase: UseCase);
    process(job: Job, done: DoneCallback): Promise<void>;
}
