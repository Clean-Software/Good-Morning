// Adaptation of  solution operfildoluiz/pensador-api [https://github.com/operfildoluiz/pensador-api]

import { IOutputResponseAPI, IsearchOptions } from "./interfaces";
const fetch = require("node-fetch");
const slugify = require("slugify");
import * as cheerio from "cheerio";
const iconv = require("iconv-lite");

export default class PensadorAPI {
  readonly baseUrl: string;
  readonly options: IsearchOptions;

  constructor(baseUrl: string, options: IsearchOptions) {
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
    try {
      const contentPage = await this.fetchPage(searchTerm, page);

      return await this.extractContent(contentPage);
    } catch (err) {
      throw err;
    }
  }
  /**
   *
   * @param searchTerm termo de busca
   * @param page pagina da busca
   * @returns conteudo da página(HTML)
   */
  async fetchPage(searchTerm: string, page = 1): Promise<string> {
    try {
      const url = `${this.baseUrl}/${searchTerm}/${page}`;
      const response = await fetch(url);
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
  async extractContent(htmlContent: any): Promise<IOutputResponseAPI[]> {
    const phrases: IOutputResponseAPI[] = [];
    try {
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
    } catch (err) {
      throw err;
    }
  }
}
