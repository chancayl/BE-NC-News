const apiRouter = require("express").Router();
const topicsRouter = require("./routes/topics-router");
const usersRouter = require("./routes/users-router");
const articlesRouter = require("./routes/articles-router");
const commentsRouter = require("./routes/comments-router");

apiRouter.use("/Topics", topicsRouter);
apiRouter.use("/Users", usersRouter);
apiRouter.use("/Articles", articlesRouter);
apiRouter.use("/Comments", commentsRouter);

module.exports = apiRouter;
