/**
* class for context of request 
/
var PromiseAdapter = function ({
  origin,
  url,
  params,
  customResponse = { result: "Success" },
}) {
  this.makeRequest = function () {
    let response;
    try {
      response = UrlFetchApp.fetch(url, params);
    } catch (err) {
      customResponse.result = "Something went wrong";
      response = customResponse;
    } finally {
      Logger.log(`${origin} executed with response ${response}`);
      if (params.method === "GET") {
        return JSON.parse(response);
      }
    }
  };
};

/**
* class to get random Phrase from our api
/
function makePhrase() {
  const content = {
    origin: "makePhrase",
    url: process.env.URL_API_PHRASE,
    params: { method: "GET" },
    customResponse: {
      author: "Frank Tibolt",
      text: "Devíamos ser ensinados a não esperar por inspiração para começar algo. Ação sempre gera inspiração. Inspiração raramente gera ação.",
    },
  };

  return new PromiseAdapter(content).makeRequest();
}

/**
* class to get random Photo from extenal api - in this case we use unsplash open api [https://unsplash.com/developers]
/
function getRandomPhoto(complemento) {
  const imageType = complemento === "Bom dia" ? "nature" : "mindfulness";
  const content = {
    origin: "getRandomPhoto",
    url: `${process.env.BASE_URL_IMAGE}/${process.env.KEY_OF_IMAGE_API}&query=${imageType}&orientation=landscape`,
    params: { method: "GET" },
    customResponse:
      imageType == "nature"
        ? process.env.DEFAULT_IMAGE_MORNING
        : process.env.DEFAULT_IMAGE_NIGHT,
  };
  return new PromiseAdapter(content).makeRequest().urls.small;
}

/**
* function to send message to community of discord using webhook
/
function sendPhrase(complemento) {
  const jsonPhrase = makePhrase();
  const image = getRandomPhoto(complemento);

  const content = {
    origin: "sendPhrase",
    url: process.env.DISCORD_WEBHOOK_URL,
    params: {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      payload: JSON.stringify({
        content: "‌",
        embeds: [
          {
            author: { name: complemento },
            description: `${jsonPhrase.text}\n\n- **${jsonPhrase.author}**`,
            image: { name: "cats", url: image },
          },
        ],
      }),
    },
  };

  new PromiseAdapter(content).makeRequest();
}
