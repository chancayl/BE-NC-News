const connection = require("../../connection");

exports.modifyComment = (id, newVote = 0) => {
  // console.log(newVote.inc_votes)
  // if (!newVote.inc_votes) {
  //   return connection
  //     .select("Comments.*")
  //     .from("Comments")
  //     .where("Comments.comment_id", "=", id)
  //     .returning("*")
  //     .then(response => {
  //       return response;
  //     });
  // } else {
  return connection("Comments")
    .where("Comments.comment_id", "=", id)
    .increment("votes", newVote)
    .returning("*")
    .then(response => {
      if (!response[0]) {
        return Promise.reject({
          status: 404,
          msg: `Request not found`
        });
      } else {
        return response;
      }
    });
  // }
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
