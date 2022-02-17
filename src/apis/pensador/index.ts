import { Request, Response } from "express";
import PensadorAPI from "./Pensador";
import { getRandomInt, getRandomPhrase } from "../../utils";

export const getPhrases = async (_request: Request, response: Response) => {
  const pensador = new PensadorAPI("https://www.pensador.com/", {
    term: "motivacional",
    page: getRandomInt(1, 2193),
  });

  let selectedPhrase;
  do {
    selectedPhrase = getRandomPhrase(await pensador.getPhrases());
  } while (!selectedPhrase);

  response.json(selectedPhrase);
};
