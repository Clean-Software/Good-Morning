import { Express, Request, Response } from "express";
import { getPhrases } from "./pensador/routes";

export default function setUpRoutes(app: Express) {
  app.use(
    "/test",
    (request: Request, response: Response) =>
      response.json("Hello, your application is running") // just a test
  );
  app.use("/getPhrase", getPhrases);
}
