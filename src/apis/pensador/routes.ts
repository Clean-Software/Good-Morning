import PensadorAPI from "./services";
import { IOutputResponseAPI } from "./interfaces";
import { Request, Response } from "express";
import { getRandomInt } from "../../utils";

export const getPhrases = async (_request: Request, response: Response) => {
  const pensador = new PensadorAPI("https://www.pensador.com", {
    term: "motivacional",
    page: getRandomInt(1, 2193),
  });
  try {
    const phrases = (await pensador.getPhrases()) as IOutputResponseAPI[];
    const selectedPhrase = phrases[getRandomInt(0, 10)];
    response.json(selectedPhrase);
  } catch (error) {
    response.status(500).json({ error });
  }
};
