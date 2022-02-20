import { IOutputResponseAPI } from "../apis/pensador/interfaces";

export const getRandomPhrase = (
  phrases: IOutputResponseAPI[]
): IOutputResponseAPI | boolean => {
  const conditions = ["/", "\\", "<", ">", "|", "'\\", "'/", '"\\'];

  for (var value of phrases) {
    if (!conditions.some((el) => value.text.includes(el))) {
      return value;
    }
  }

  return false;
};
