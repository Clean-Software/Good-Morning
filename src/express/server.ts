import "dotenv/config";
import express, { Express } from "express";
import setUpRoutes from "../apis";

/**
 * Class that represents the server using the express framework.
 */
export class Server {
  app: Express;
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  config() {
    this.app.use(express.json());
  }
  routes() {
    setUpRoutes(this.app);
  }
}

export default new Server().app;
