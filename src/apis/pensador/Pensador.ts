// Adaptation of  solution operfildoluiz/pensador-api [https://github.com/operfildoluiz/pensador-api]

import { outputResponseAPI, searchOptions } from "./interfaces";
const fetch = require("node-fetch");
const slugify = require("slugify");
const cheerio = require("cheerio");
const iconv = require("iconv-lite");

export default class PensadorAPI {
  readonly baseUrl: string;
  readonly options: searchOptions;

  constructor(baseUrl: string, options: searchOptions) {
    this.baseUrl = baseUrl;
    this.options = options;
  }
  /**
   *  Método que retorna as frases
   * @returns frases da página
   */
  async getPhrases() {
    const { term, page } = this.options;

    const searchTerm = slugify(`frases de ${term}`, {
      replacement: "_",
      remove: /[*+~.()'"!:@]/g,
      lower: true,
    });

    const contentPage = await this.fetchPage(searchTerm, page);

    return await this.extractContent(contentPage);
  }
  /**
   *
   * @param searchTerm termo de busca
   * @param page pagina da busca
   * @returns conteudo da página(HTML)
   */
  async fetchPage(searchTerm: string, page = 1) {
    try {
      const response = await fetch(`${this.baseUrl}/${searchTerm}/${page}`);
      const arrayBuffer = await response.arrayBuffer();
      return iconv.decode(Buffer.from(arrayBuffer), "utf-8").toString();
    } catch (err) {
      throw err;
    }
  }
  /**
   *
   * @param htmlContent conteudo da página(HTML)
   * @returns frases da página
   */
  async extractContent(htmlContent: any) {
    const phrases: outputResponseAPI[] = [];
    const $ = cheerio.load(htmlContent);
    $(".thought-card").each(function () {
      phrases.push({
        //@ts-ignore
        author: $(this).find("a").first().text(),
        //@ts-ignore
        text: $(this).find("p").first().text().replace(/\n/g, ""),
      });
    });
    return phrases;
  }
}
