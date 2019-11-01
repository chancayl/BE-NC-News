const { modifyComment, removeComment } = require("../models/comments-model");

exports.updateComment = (req, res, next) => {
  const id = req.params.comment_id;
  const newVote = req.body.inc_votes;
  modifyComment(id, newVote)
    .then(([comment]) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const id = req.params.comment_id;
  removeComment(id)
    .then(comment => {
      res.sendStatus(204);
    })
    .catch(next);
};
