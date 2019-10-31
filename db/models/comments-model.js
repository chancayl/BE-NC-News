const connection = require("../../connection");

exports.modifyComment = (id, newVote) => {
  if (typeof newVote !== "number") {
    return Promise.reject({
      status: 400,
      msg: `Incorrect value`
    });
  }
  if (typeof newVote === "number") {
    return connection
      .select("Comments.*")
      .from("Comments")
      .where("Comments.comment_id", "=", id)
      .increment("votes", newVote)
      .returning("*")
      .then(response => {
        if (response.length >= 1) {
          return response;
        } else {
          return Promise.reject({
            status: 404,
            msg: `Request not found`
          });
        }
      });
  }
};

exports.removeComment = id => {
  return connection("Comments")
    .where("comment_id", "=", id)
    .del()
    .then(deleteCount => {
      if (deleteCount === 0) {
        return Promise.reject({
          status: 404,
          msg: "Request not found"
        });
      } else {
        return deleteCount;
      }
    });
};
