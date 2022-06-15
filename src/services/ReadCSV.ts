import { createReadStream } from "fs"
import { parse } from "csv-parse"
import { GeneralQueue } from "../queues/GeneralQueue";

const PATH = `${process.cwd()}/test1.csv`;
/**
 *
 */
export class ReadCSV {
  constructor(private readonly generalQueue:GeneralQueue) {
    console.log("ReadCSV Class Init");
  }

  readFile() {
    createReadStream(PATH)
      .on("error", () => {
        console.log(
          `--------------------OCURRIO UN ERROR LEYENDO EL CSV-------------------`
        );
      })

      .pipe(parse())
      .on("data", (row) => {
        this.generalQueue.addToQueue(row)
        // console.log(row[1])
      })

      .on("end", () => {
        console.log(`-------------------TODO BIEN-------------------`);
      });
  }
}
