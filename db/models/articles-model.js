const connection = require("../../connection");

exports.fetchArticles = id => {
  return connection
    .select("Articles.*")
    .from("Articles")
    .where("Articles.article_id", "=", id)
    .leftJoin("Comments", "Articles.article_id", "Comments.article_id")
    .groupBy("Articles.article_id")
    .count({ comment_count: "Comments.comment_id" });
};

exports.modifyArticle = (id, newVote) => {
  if (typeof newVote !== "number") {
    return Promise.reject({
      status: 400,
      msg: `Incorrect value`
    });
  } else {
    return connection
      .select("Articles.*")
      .from("Articles")
      .where("Articles.article_id", "=", id)
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

exports.addComment = (id, newComment) => {
  let comment = {};
  comment.author = newComment.username;
  comment.article_id = id;
  comment.body = newComment.body;
  return connection("Comments")
    .insert(comment)
    .returning("*");
};

exports.commentsByArticleId = (
  id,
  sort_by = "created_at",
  sort_order = "desc"
) => {
  return connection
    .select("*")
    .from("Comments")
    .where("Comments.article_id", "=", id)
    .returning("*")
    .orderBy(sort_by, sort_order);
};

exports.arrayofArticles = (
  username,
  topic,
  sort_by = "Articles.created_at",
  sort_order = "desc"
) => {
  return connection
    .select(
      "Articles.article_id",
      "title",
      "Articles.votes",
      "Articles.topic",
      "Articles.author",
      "Articles.created_at"
    )
    .from("Articles")
    .leftJoin("Comments", "Articles.article_id", "Comments.article_id")
    .groupBy("Articles.article_id")
    .count({ comment_count: "Comments.comment_id" })
    .orderBy(sort_by, sort_order)
    .modify(query => {
      if (username) query.where("Articles.author", "=", username);
      if (topic) query.where("Articles.topic", "=", topic);
    })
    .returning("*")
    .then(article => {
      if (article.length >= 1) {
        return article;
      } else {
        return Promise.reject({
          status: 404,
          msg: `Request not found`
        });
      }
    });
};
