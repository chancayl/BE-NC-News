const { fetchUsers } = require("../models/users-model");
exports.getUsers = (req, res, next) => {
  const {username} = req.params;
  fetchUsers(username)
    .then(([user]) => {
      res.status(200).send({user});
    })
    .catch(next);
};
