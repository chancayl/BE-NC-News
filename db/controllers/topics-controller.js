const { fetchTopics, allTopics } = require("../models/topics-model");

exports.getTopics = (req, res, next) => {
  const query = req.query.slug;
  if (query) {
    allTopics(query)
      .then(topic => {
        res.status(200).send({topic});
      })
      .catch(next);
  } else {
    fetchTopics().then(topics => {
      res.status(200).send({topics});
    });
  }
};
