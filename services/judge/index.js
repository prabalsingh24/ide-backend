const rp = require("request-promise");

const config = require("../../config/config.json")[process.env.NODE_ENV || "development"];

const apiBase = config.judge.apiBase;
const uri = path => apiBase + path;

module.exports = {
  getLangs: () =>
    rp({
      uri: uri("/langs"),
      json: true,
      headers: {
        Authorization: `Bearer ${config.judge.apiKey}`
      }
    }),
  runCode: ({ source, lang, input }) =>
    rp({
      method: "POST",
      uri: uri("/runs"),
      json: true,
      headers: {
        Authorization: `Bearer ${config.judge.apiKey}`
      },
      body: {
        source,
        lang,
        stdin: input,
        mode: "callback",
        callback: config.api.apiBase + "/run/cb"
      }
    })
};
