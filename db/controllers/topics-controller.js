const { fetchTopics, allTopics } = require("../models/topics-model");

exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then(response => {
      res.status(200).send(response);
    })
    .catch(next);
};

exports.getCorrectTopic = (req, res, next) => {
  console.log(req.query)
  allTopics(req.query)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(next);
};
