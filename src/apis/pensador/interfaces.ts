interface IOutputResponseAPI {
  author: string;
  text: string;
}

interface IsearchOptions {
  term: string | "motivacional";
  page: number | 1;
}

export { IOutputResponseAPI, IsearchOptions };
