interface outputResponseAPI {
  author: string;
  text: string;
}

interface searchOptions {
  term: string | "motivacional";
  page: number | 1;
}

export { outputResponseAPI, searchOptions };
