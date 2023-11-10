import express from "express";
import fs from "fs";

const app = express();
const port = 3000;

app.get("/lines/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const file = fs.query.file as string;

  const readStream = fs.createReadStream(file, { encoding: "utf8" });

  let currentLine = 0;
  readStream.on("data", (chunk) => {
    for (let i = 0; i < chunk.length; i++) {
      if (chunk[i] === "\n") {
        currentLine++;
        if (currentLine === index) {
          const line = chunk.slice(0, i);
          readStream.close();
          res.status(200).send(line);
          return;
        }
      }
    }
  });

  readStream.on("end", () => {
    res
      .status(413)
      .send("Requested line number is beyond the end of the file.");
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
