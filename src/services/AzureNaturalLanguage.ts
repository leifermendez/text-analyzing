import axios, { AxiosInstance } from "axios";

const AZURE_URI = "https://instance-text-exceia.cognitiveservices.azure.com";
const AZURE_KEY = "314f7165a7c743bc89c6bdf826e967b2";

export class AzureNaturalLanguage {
  private axiosInstante: AxiosInstance;

  constructor() {
    this.axiosInstante = axios.create({
      baseURL: AZURE_URI,
      timeout: 1000,
      headers: {
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": AZURE_KEY,
      },
    });
  }

  public analyzing(text: string) {
    return this.axiosInstante.post(
      "/language/:analyze-text?api-version=2022-05-01",
      {
        kind: "EntityRecognition",
        analysisInput: {
          documents: [
            {
              id: "documentId",
              text: text,
              language: "es",
            },
          ],
        },
      }
    );
  }

  public mapResponse({ data }: any) {
    const listEntities = data.results.documents[0].entities;

    const topics = {
      event: listEntities
        .filter((a: any) => a.category === "Skill")
        .map((b: any) => b.text),
      other: listEntities
        .filter((a: any) => a.category === "OTHER")
        .map((b: any) => b.text),
      person: listEntities
        .filter((a: any) => a.category === "PersonType")
        .map((b: any) => b.text),
      date: listEntities
        .filter((a: any) => a.category === "DATE")
        .map((b: any) => b.text),
      location: listEntities
        .filter((a: any) => ["Location", "Address"].includes(a.category))
        .map((b: any) => b.text),
    };

    return topics;
  }
}
