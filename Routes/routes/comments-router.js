const commentsRouter = require("express").Router();
const {
  updateComment,
  deleteComment
} = require("../../db/controllers/comments-controller");

const { send405Error } = require("../../apps/err/errors");

commentsRouter
  .route("/:comment_id")
  .patch(updateComment)
  .delete(deleteComment)
  .all(send405Error);

module.exports = commentsRouter;
