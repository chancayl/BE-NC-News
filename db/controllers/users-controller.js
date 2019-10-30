const { fetchUsers } = require("../models/users-model");
exports.getUsers = (req, res, next) => {
  const clientrequest = req.params;
  fetchUsers(clientrequest.username)
    .then(response => {
      res.status(200).send(response[0]);
    })
    .catch(next);
};
