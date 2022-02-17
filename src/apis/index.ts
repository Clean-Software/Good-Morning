import { Express, Request, Response } from "express";
import { getPhrases } from "./pensador";

export default function setUpRoutes(app: Express) {
  app.use("/test", (request: Request, response: Response) =>
    response.json("Hello World")
  );
  app.use("/getPhrase", getPhrases);
}
