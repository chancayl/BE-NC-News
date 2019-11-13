const {
  fetchArticles,
  modifyArticle,
  addComment,
  commentsByArticleId,
  arrayofArticles
} = require("../models/articles-model");


exports.getArticle = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticles(article_id)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.updateArticle = (req, res, next) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  modifyArticle(article_id, inc_votes)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { article_id } = req.params;
  const newComment = req.body;
  addComment(article_id, newComment)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getComments = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by, order } = req.query;
  commentsByArticleId(article_id, sort_by, order)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.getArrayofArticles = (req, res, next) => {
  const { author, topic, sort_by, order } = req.query;
  arrayofArticles(author, topic, sort_by, order)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
