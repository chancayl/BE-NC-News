const articlesRouter = require("express").Router();
const {
  getArticle,
  updateArticle,
  postComment,
  getComments,
  getArrayofArticles
} = require("../../db/controllers/articles-controller");

const {send405Error } = require("../../apps/err/errors")

articlesRouter
  .route("/:article_id")
  .get(getArticle)
  .patch(updateArticle)
  .all(send405Error);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getComments)
  .all(send405Error);

articlesRouter
  .route("/")
  .get(getArrayofArticles)
  .all(send405Error);

module.exports = articlesRouter;
