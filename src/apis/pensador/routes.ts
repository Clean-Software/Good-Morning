import PensadorAPI from "./services";
import { Request, Response } from "express";
import { getRandomInt } from "../../utils";

export const getPhrases = async (_request: Request, response: Response) => {
  const pensador = new PensadorAPI("https://www.pensador.com", {
    term: "frases_motivacionais",
    page: getRandomInt(1, 653),
  });
  try {
    const phrases = await pensador.getPhrases();

    const randomIndex = getRandomInt(0, phrases.length - 1);
    const selectedPhrase = phrases[randomIndex];

    response.json(selectedPhrase);
  } catch (error) {
    response.status(500).json({ error });
  }
};
