const { fetchTopics, getTopic } = require("../models/topics-model");

exports.getTopics = (req, res, next) => {
  const { slug } = req.query;
  if (slug) {
    getTopic(slug)
      .then(topic => {
        res.status(200).send({ topic });
      })
      .catch(next);
  } else {
    fetchTopics().then(topics => {
      res.status(200).send({ topics });
    });
  }
};
