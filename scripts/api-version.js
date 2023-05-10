const yaml = require("js-yaml");
const fs = require("fs");
const path = require("path");

const API_PATH = path.resolve(__dirname, "../api.yml");
const API_VERSION_PATH = path.resolve(__dirname, "../src/generated/api-version.json");

try {
  const api = yaml.load(fs.readFileSync(API_PATH, "utf8"));
  const { version } = api.info;
  fs.writeFileSync(API_VERSION_PATH, JSON.stringify({ version }, null, 2));
} catch (e) {
  console.log(e);
}
