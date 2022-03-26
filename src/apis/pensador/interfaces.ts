interface IOutputResponseAPI {
  author: string;
  text: string;
}

interface IsearchOptions {
  term: string;
  page: number;
}

export { IOutputResponseAPI, IsearchOptions };
