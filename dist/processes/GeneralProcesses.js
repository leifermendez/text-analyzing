"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeneralProcceses = void 0;
class GeneralProcceses {
    constructor(naturalLanguage, spreadSheat, useCase) {
        this.naturalLanguage = naturalLanguage;
        this.spreadSheat = spreadSheat;
        this.useCase = useCase;
        this.process = this.process.bind(this);
    }
    async process(job, done) {
        try {
            const { data } = job;
            const text = data[1];
            const response = await this.naturalLanguage.analyzing(text);
            const topics = {
                event: response.analyzeEntities
                    .filter((a) => a.type === "EVENT")
                    .map((b) => b.name),
                other: response.analyzeEntities
                    .filter((a) => a.type === "OTHER")
                    .map((b) => b.name),
                person: response.analyzeEntities
                    .filter((a) => a.type === "PERSON")
                    .map((b) => b.name),
                date: response.analyzeEntities
                    .filter((a) => a.type === "DATE")
                    .map((b) => b.name),
                location: response.analyzeEntities
                    .filter((a) => a.type === "LOCATION")
                    .map((b) => b.name),
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
            console.log(dataParse);
            // await this.spreadSheat.addRows(data)
            this.useCase.register(dataParse);
            done();
        }
        catch (e) {
            done(new Error("ERROR_SKIP"));
        }
    }
}
exports.GeneralProcceses = GeneralProcceses;
