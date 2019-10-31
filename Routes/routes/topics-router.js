const topicsRouter = require("express").Router();
const { getTopics, getCorrectTopic } = require("../../db/controllers/topics-controller");
const {send405Error} = require("../../apps/err/errors")

topicsRouter
  .route("/")
  .get(getTopics)
  .get(getCorrectTopic)
  .all(send405Error);

module.exports = topicsRouter;
