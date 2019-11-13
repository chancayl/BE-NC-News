const connection = require("../../connection");

exports.fetchUsers = username => {
  return connection
    .select("*")
    .from("Users")
    .where("username", "=", username)
    .then(response => {
      if (response.length === 0) {
        return Promise.reject({
          status: 404,
          msg: `Request not found`
        });
      } else {
        return response;
      }
    });
};
