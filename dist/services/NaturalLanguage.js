"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NaturalLanguage = void 0;
const language_1 = require("@google-cloud/language");
const fs_1 = require("fs");
const PATH_CREDENTIALS = `${process.cwd()}/key.json`;
class NaturalLanguage {
    constructor() {
        const parseCredentials = JSON.parse((0, fs_1.readFileSync)(PATH_CREDENTIALS, "utf-8"));
        const CONFIGURATION = {
            credentials: {
                private_key: parseCredentials["private_key"],
                client_email: parseCredentials["client_email"],
            },
        };
        this.client = new language_1.LanguageServiceClient(CONFIGURATION);
    }
    async analyzeEntities(data) {
        try {
            const document = {
                content: data.document,
                type: "PLAIN_TEXT",
            };
            const [response] = await this.client.analyzeEntities({ document });
            const parseResponse = response.entities.map((ent) => ({
                type: ent.type,
                name: ent.name,
            }));
            return parseResponse;
        }
        catch (e) {
            return null;
        }
    }
    async analyzeSentiment(data) {
        try {
            const document = {
                content: data.document,
                type: "PLAIN_TEXT",
            };
            const [response] = await this.client.analyzeSentiment({ document });
            const parseResponse = response.documentSentiment.score;
            return parseResponse;
        }
        catch (e) {
            return null;
        }
    }
    async analyzing(document) {
        const analyzeEntities = await this.analyzeEntities({ document });
        const analyzeSentiment = await this.analyzeSentiment({ document });
        return { analyzeSentiment, analyzeEntities };
    }
}
exports.NaturalLanguage = NaturalLanguage;
