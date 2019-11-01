const { fetchTopics, allTopics } = require("../models/topics-model");

exports.getTopics = (req, res, next) => {
  const query = req.query.slug;
  if (query) {
    allTopics(query)
      .then(response => {
        res.status(200).send(response);
      })
      .catch(next);
  } else {
    fetchTopics().then(topics => {
      res.status(200).send(topics);
    });
  }
};
