import fs from "fs";

export class FileHandler {
  static readLine(filePath: string, lineNumber: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const readStream = fs.createReadStream(filePath, { encoding: "utf8" });

      let currentLine = 0;
    readStream.on("data", (chunk: string | any[]) => {
        for (let i = 0; i < chunk.length; i++) {
            if (chunk[i] === "\n") {
                currentLine++;
                if (currentLine === lineNumber) {
                    const line = chunk.slice(0, i);
                    readStream.close();
                    resolve(line.toString());
                    return;
                }
            }
        }
    });

      readStream.on("end", () => {
        reject("Requested line is beyond the end of the file.");
      });
    });
  }
}
