const connection = require("../../connection");

exports.fetchUsers = username => {
  return connection
    .select("*")
    .from("Users")
    .where("username", "=", username);
};
