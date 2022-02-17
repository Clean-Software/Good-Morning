import { outputResponseAPI } from "../apis/pensador/interfaces";

export const getRandomPhrase = (phrases: outputResponseAPI[]) => {
  const conditions = ["/", "\\", "<", ">", "|", "'\\", "'/", '"\\'];

  for (var value of phrases) {
    if (!conditions.some((el) => value.text.includes(el))) {
      return value;
    }
  }

  return false;
};
