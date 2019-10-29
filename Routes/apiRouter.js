const apiRouter = require("express").Router();
const topicsRouter = require("./routes/topics-router");
const usersRouter = require("./routes/users-router")

apiRouter.use("/Topics", topicsRouter);
apiRouter.use("/Users", usersRouter);

module.exports = apiRouter;