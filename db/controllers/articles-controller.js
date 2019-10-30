const {
  fetchArticles,
  modifyArticle,
  addComment,
  commentsByArticleId
} = require("../models/articles-model");

exports.getArticle = (req, res, next) => {
  const id = req.params;
  fetchArticles(id.article_id)
    .then(response => {
      res.status(200).send(response[0]);
    })
    .catch(next);
};

exports.updateArticle = (req, res, next) => {
  const id = req.params.article_id;
  const { inc_votes } = req.body;
  modifyArticle(id, inc_votes)
    .then(article => {
      res.status(200).send(article[0]);
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const id = req.params.article_id;
  const newComment = req.body;
  addComment(id, newComment)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getComments = (req, res, next) => {
  const id = req.params.article_id;
  const { sort_by, sort_order } = req.query;
  commentsByArticleId(id, sort_by, sort_order)
    .then(response => {
      res.status(200).send(response);
    })
    .catch(next);
};
