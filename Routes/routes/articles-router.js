const articlesRouter = require("express").Router();
const {
  getArticle,
  updateArticle,
  postComment,
  getComments
} = require("../../db/controllers/articles-controller");

articlesRouter
  .route("/:article_id")
  .get(getArticle)
  .patch(updateArticle);

articlesRouter
    .route("/:article_id/comments")
    .post(postComment)
    .get(getComments)

module.exports = articlesRouter;
