import fs from "fs";

export class FileHandler {
  static readLine(filePath: string, lineNumber: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(filePath, { encoding: "utf8" });
      let buffer = "";
      let currentLine = 0;
      let lineFound = false;

      readStream.on("data", (chunk: string | any[]) => {
        const chuckWithBuffer = buffer + chunk;
        const lines = chuckWithBuffer.split("\n");

        for (let i = 0; i < chunk.length; i++) {
          if (currentLine === lineNumber) {
            resolve(lines[i]);
            lineFound = true;
            break;
          }
          currentLine++;
        }
        buffer = lines[lines.length - 1];
      });

      readStream.on("end", () => {
        reject("Requested line is beyond the end of the file.");
      });
    });
  }
}
