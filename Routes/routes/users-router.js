const usersRouter = require("express").Router();
const { getUsers } = require("../../db/controllers/users-controller");
// const { handleCustError } = require("../../apps/err/errors");

usersRouter
  .route("/:username")
  .get(getUsers)
  // .all(handleCustError);

module.exports = usersRouter;
