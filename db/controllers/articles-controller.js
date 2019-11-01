const {
  fetchArticles,
  modifyArticle,
  addComment,
  commentsByArticleId,
  arrayofArticles
} = require("../models/articles-model");

exports.getArticle = (req, res, next) => {
  const id = req.params;
  fetchArticles(id.article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.updateArticle = (req, res, next) => {
  const id = req.params.article_id;
  const { inc_votes } = req.body;
  modifyArticle(id, inc_votes)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const id = req.params.article_id;
  const newComment = req.body;
  addComment(id, newComment)
    .then(comment => {
      console.log("controller");
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getComments = (req, res, next) => {
  const id = req.params.article_id;
  const { sort_by, sort_order } = req.query;
  commentsByArticleId(id, sort_by, sort_order)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.getArrayofArticles = (req, res, next) => {
  const { author, topic, sort_by, sort_order } = req.query;
  arrayofArticles(author, topic, sort_by, sort_order)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
