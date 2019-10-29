const express = require("express");
const app = express();
const apiRouter = require("../Routes/apiRouter");
const { send405Error, handleCustError } = require("./err/errors");

app.use("/api", apiRouter);

app.use((err, req, res, next) => {
  if (res.status === 404) {
    handleCustError(err);
  }
});
app.use(express.json());

module.exports = app;
