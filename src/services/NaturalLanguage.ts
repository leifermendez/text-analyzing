import { LanguageServiceClient } from "@google-cloud/language";
import { readFileSync } from "fs";

const PATH_CREDENTIALS = `${process.cwd()}/key.json`;

export class NaturalLanguage {
  private client!: LanguageServiceClient;
  constructor() {
    const parseCredentials = JSON.parse(
      readFileSync(PATH_CREDENTIALS, "utf-8")
    );

    const CONFIGURATION = {
      credentials: {
        private_key: parseCredentials["private_key"],
        client_email: parseCredentials["client_email"],
      },
    };

    this.client = new LanguageServiceClient(CONFIGURATION);
  }

  private async analyzeEntities(data: Document) {
    try {
      const document: any = {
        content: data.document,
        type: "PLAIN_TEXT",
      };

      const [response] = <any>await this.client.analyzeEntities({ document });
      const parseResponse = response.entities.map(
        (ent: { type: any; name: any }) => ({
          type: ent.type,
          name: ent.name,
        })
      );
      return parseResponse;
    } catch (e) {
      return null;
    }
  }

  private async analyzeSentiment(data: Document) {
    try {
      const document: any = {
        content: data.document,
        type: "PLAIN_TEXT",
      };

      const [response] = <any>await this.client.analyzeSentiment({ document });
      const parseResponse = response.documentSentiment.score;
      return parseResponse;
    } catch (e) {
      return null;
    }
  }

  public async analyzing(document: string) {
    const analyzeEntities = await this.analyzeEntities({ document });
    const analyzeSentiment = await this.analyzeSentiment({ document });
    return { analyzeSentiment, analyzeEntities };
  }
}

interface Document {
  document: string;
}
