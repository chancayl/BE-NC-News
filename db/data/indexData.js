const ENV = process.env.NODE_ENV || "development";

const testData = require("./test-data/indexTest");
const devData = require("./development-data/indexDev");

const data = {
  development: devData,
  test: testData
};

module.exports = data[ENV];
