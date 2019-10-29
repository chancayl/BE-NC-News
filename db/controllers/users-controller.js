const { fetchUsers } = require("../models/users-model");

exports.getUsers = (req, res, next) => {
  const clientrequest = req.params;
  fetchUsers(clientrequest.username)
    .then(response => {
      if (response.length === 0) {
        next();
      } else {
        res.status(200).send(response[0]);
      }
    })
};
