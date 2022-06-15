const dotenv = require("dotenv");
const fs = require("fs");
const csv = require("csv-parser");
const language = require("@google-cloud/language");
const googleSpreadsheet = require("google-spreadsheet");
const PATH = `${process.cwd()}/test-split.csv`;
const PATH_CREDENTIALS = `${process.cwd()}/chatbot-9nmj-ad0903b7d1c9.json`;
const doc = new googleSpreadsheet.GoogleSpreadsheet(
  "1l7vtOI7g9QJnTvwR-SvZkJYCLdHswN4qWSy4NN6cERs"
);
const parseCredentials = JSON.parse(fs.readFileSync(PATH_CREDENTIALS));
const CONFIGURATION = {
  credentials: {
    private_key: parseCredentials["private_key"],
    client_email: parseCredentials["client_email"],
  },
};
const client = new language.LanguageServiceClient(CONFIGURATION);
dotenv.config();
console.log(PATH);
/**
 *
 */

async function saveGoogle(data) {
    try{
        await doc.useServiceAccountAuth({
            client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
          });
        
          await doc.loadInfo();
          const sheet = doc.sheetsByIndex[0];
          let dataArray = []
          dataArray.push({
            asunto: 'data["Asunto"]',
            cuerpo: 'data["Cuerpo"]',
            de_nombre: 'data["De: (nombre)"]',
            de_direccion: 'data["De: (dirección)"]',
            para_nombre: 'data["Para: (nombre)"]',
            para_direccion: 'data["Para: (dirección)"]',
            cc_nombre: 'data["CC: (nombre)"]',
            cc_direccion: 'data["CC: (dirección)"]',
            event: data.event,
            person: data.person,
            location: data.location,
            date: data.date,
          });
          await sheet.addRows(dataArray);
    }catch(e){
        console.log(e)
    }
}

/** */

function leer() {
  fs.createReadStream(PATH)
    .on("error", () => {
      // handle error
    })

    .pipe(csv())
    .on("data", async (row) => {
      quickstart(row)
    })

    .on("end", () => {
      // handle end of CSV
    });
}

let delay = (time) => (result) => new Promise(resolve => setTimeout(() => resolve(result), time));

async function quickstart(data) {


  // The text to analyze
  const text = data['Cuerpo']

  const document = {
    content: text,
    type: "PLAIN_TEXT",
  };

  // Detects the sentiment of the text
  Promise.all([
    client.analyzeEntities({ document: document }),
    client.analyzeSentiment({ document: document }),
  ])
  .then(delay(1000))
  .then(([entities, sentimient]) => {
    const [resultEntities] = entities;
    const [resultSentimient] = sentimient;
    const filterEntities = resultEntities.entities.map((ent) => ({
      type: ent.type,
      name: ent.name,
    }));
    const filterSentiment = resultSentimient.documentSentiment.score;
    const dataParse = {
        ...data,
        event:'',
        person:'',
        location:'',
        date:''
    }


    saveGoogle(dataParse)
 
  });

  // const [result] = await client.analyzeEntities({document: document});
  // const sentiment = result.documentSentiment;
  // const filterEntities = result.entities.map((ent) => ({type:ent.type, name:ent.name}))
  // console.log(filterEntities)
  // console.log(`Sentiment score: ${sentiment.score}`);
  // console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
}
// saveGoogle()
leer();
