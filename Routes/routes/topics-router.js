const topicsRouter = require("express").Router();
const { getTopics } = require("../../db/controllers/topics-controller");
const {send405Error} = require("../../apps/err/errors")

topicsRouter
  .route("/")
  .get(getTopics)
  .all(send405Error);

module.exports = topicsRouter;
