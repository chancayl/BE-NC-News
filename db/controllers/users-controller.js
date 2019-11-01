const { fetchUsers } = require("../models/users-model");
exports.getUsers = (req, res, next) => {
  const clientrequest = req.params;
  fetchUsers(clientrequest.username)
    .then(([users]) => {
      res.status(200).send({users});
    })
    .catch(next);
};
