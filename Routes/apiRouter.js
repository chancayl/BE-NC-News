const apiRouter = require("express").Router();
const topicsRouter = require("./routes/topics-router");
const usersRouter = require("./routes/users-router");
const articlesRouter = require("./routes/articles-router");

apiRouter.use("/Topics", topicsRouter);
apiRouter.use("/Users", usersRouter);
apiRouter.use("/Articles", articlesRouter);

module.exports = apiRouter;
