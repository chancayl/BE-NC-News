const connection = require("../../connection");

exports.fetchTopics = () => {
  return connection
    .select("*")
    .from("Topics")
    .returning("description", "slug");
};

exports.allTopics = (topicname) => {
  return connection
    .select("*")
    .from("Topics")
    .where("Topics.slug", "=", topicname)
    .returning("*")
    .then(response => {
      if (response.length >= 1) {
        console.log(response);
        return response;
      }
    });
};
