const usersRouter = require("express").Router();
const { getUsers } = require("../../db/controllers/users-controller");
const { send405Error } = require("../../apps/err/errors");

usersRouter
  .route("/:username")
  .get(getUsers)
  .all(send405Error);

module.exports = usersRouter;
