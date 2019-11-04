const { modifyComment, removeComment } = require("../models/comments-model");

exports.updateComment = (req, res, next) => {
  const {comment_id} = req.params;
  const {inc_votes} = req.body;
  modifyComment(comment_id, inc_votes)
    .then(([comment]) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteComment = (req, res, next) => {
  const {comment_id} = req.params;
  removeComment(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
