import express from "express";
import { FileHandler } from "./handlers/fileHandler";

export class Server {
  private app: express.Express;
  private port: number;
  private server: any;

  constructor(port: number) {
    this.app = express();
    this.port = port;

    this.app.get("/lines/:index", this.handleLinesRequest.bind(this));

    this.server = this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });

    process.on("SIGINT", this.gracefulShutdown.bind(this));
  }

  private async handleLinesRequest(
    req: express.Request,
    res: express.Response,
  ) {
    const index = parseInt(req.params.index);
    const file = req.query.file as string;

    try {
      const line = await FileHandler.readLine(file, index);
      res.status(200).send(`Requested line: ${line}`);
    } catch (err) {
      res.status(413).send(err);
    }
  }

  private gracefulShutdown() {
    console.log("Shutting down server...");
    this.server.close(() => {
      console.log("Closed out remaining connections.");
      process.exit(0);
    });

    setTimeout(() => {
      console.error(
        "Could not close connections in time, forcefully shutting down",
      );
      process.exit(1);
    }, 10000);
  }
}

new Server(3000);
