const apiRouter = require("express").Router();
const topicsRouter = require("./routes/topics-router");
const usersRouter = require("./routes/users-router");
const articlesRouter = require("./routes/articles-router");
const commentsRouter = require("./routes/comments-router");

const { send405Error } = require("../apps/err/errors");

apiRouter.use("/Topics", topicsRouter);
apiRouter.use("/Users", usersRouter);
apiRouter.use("/Articles", articlesRouter);
apiRouter.use("/Comments", commentsRouter);

apiRouter
  .route("/")
  .get((req, res) => {
    res.status(200).send("Hi");
  })
  .all(send405Error);

module.exports = apiRouter;
