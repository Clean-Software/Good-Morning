import PensadorAPI from "./services";
import { IOutputResponseAPI } from "./interfaces";
import { Request, Response } from "express";
import { getRandomInt, getRandomPhrase } from "../../utils";

export const getPhrases = async (_request: Request, response: Response) => {
  const pensador = new PensadorAPI("https://www.pensador.com/", {
    term: "motivacional",
    page: getRandomInt(1, 2193),
  });
  try {
    let selectedPhrase: IOutputResponseAPI | boolean;
    do {
      selectedPhrase = getRandomPhrase(await pensador.getPhrases());
    } while (!selectedPhrase);
    response.json(selectedPhrase);
  } catch (error) {
    response.status(500).json({ error });
  }
};
