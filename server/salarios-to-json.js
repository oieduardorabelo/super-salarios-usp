const { promisify } = require("util");
const fs = require("fs");
const path = require("path");

const readFileAsync = promisify(fs.readFile);
const writeFileAsync = promisify(fs.writeFile);
const joinPath = str => path.resolve(__dirname, str);

const filePath = joinPath("usp-salarios.txt");
const finalFileName = "usp-salarios.json";
const outputJson = `${__dirname}/${finalFileName}`;
const defaultEncoding = "utf-8";

const gen = () => Math.random().toString(32).slice(2);
const genId = () => `${gen()}${gen()}`;

function createTextMatrix(str) {
  let dic = {};
  str
    .trim()
    .replace(/([0-9])(\n+)(\w)/gm, "$1;$3")
    .split(";")
    .map(i => i.split(/\n/))
    .map(i => {
      const id = genId();
      dic[id] = {};
      return i.map(j => {
        const d = j.split(":");
        dic[id][d[0].trim()] = d[1].trim();
      });
    });
  return dic;
}

readFileAsync(filePath, { encoding: defaultEncoding })
  .then(fileContent => {
    const textMatrix = createTextMatrix(fileContent);
    const data = JSON.stringify({ data: textMatrix });

    writeFileAsync(outputJson, data, defaultEncoding)
      .then(() => {
        console.log("JSON Generated!");
      })
      .catch(err => {
        console.log("ERROR: ", err);
      });
  })
  .catch(err => {
    console.log("ERROR: ", err);
  });
