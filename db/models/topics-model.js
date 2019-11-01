const connection = require("../../connection");

exports.fetchTopics = () => {
  return connection
    .select("*")
    .from("Topics")
    .returning("description", "slug");
};

exports.allTopics = topicname => {
  return connection
    .select("*")
    .from("Topics")
    .where("Topics.slug", "=", topicname)
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
};
