import { Request, Response } from "express";
import PensadorAPI from "./Pensador";
import randomInt from "../../utils/getRandomInt";

export const getPhrases = async (_request: Request, response: Response) => {
  const page = randomInt(1, 2193);
  const term = "motivacional";
  const pensador = new PensadorAPI("https://www.pensador.com/", { term, page });
  const phrases = await pensador.getPhrases();

  const sorted = randomInt(0, phrases.length - 1);
  response.json(phrases[sorted]);
};
