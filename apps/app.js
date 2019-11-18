const express = require("express");
const app = express();
const apiRouter = require("../Routes/apiRouter");
const { send405Error, handleCustError, handle400 } = require("./err/errors");

import cors from "cors";
import app from "express";

app.use(cors());

app.use(express.json());
app.use("/api", apiRouter).all(send405Error)

app.use(handleCustError);
app.use(handle400);

module.exports = app;
