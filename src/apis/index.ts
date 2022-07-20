import { Express } from "express";
import { getPhrases } from "./pensador/routes";

export default function setUpRoutes(app: Express) {
  app.use("/getPhrase", getPhrases);
}
