const connection = require("../../connection");

exports.fetchTopics = () => {
  return connection
    .select("*")
    .from("Topics")
    .returning("description", "slug")
};
