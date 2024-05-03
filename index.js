#!/usr/bin/env node
const http = require("http");
const readline = require("readline");
const input = readline.createInterface(process.stdin, process.stdout);
const APIKey = process.env.APIKey;
const ApiURL = "http://api.weatherstack.com/";
console.log("Введите город");
input.on("line", (data) => {
  const city = data.trim().replace(/ /g, "%20");
  http.get(
    `${ApiURL}current?access_key=${APIKey}&query=${city}`,
    (res) => {
      const { statusCode } = res;
      if (statusCode !== 200) {
        error = new Error(
          "Request Failed.\n" + `Status Code: ${statusCode}`
        );
        console.error(error.message);
      }
      res.setEncoding("utf8");
      let rawData = "";
      res.on("data", (chunk) => {
        rawData += chunk;
      });
      res.on("end", () => {
        try {
          const parsedData = JSON.parse(rawData);
          console.log("Погода:\n", parsedData);
        } catch (e) {
        console.error(e.message);
        }
      });
    }
  );
});