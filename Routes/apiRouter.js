const apiRouter = require("express").Router();
const topicsRouter = require("./routes/topics-router");
const usersRouter = require("./routes/users-router");
const articlesRouter = require("./routes/articles-router");
const commentsRouter = require("./routes/comments-router");
const json = require("../endpoints.json");

const { send405Error } = require("../apps/err/errors");

apiRouter
  .route("/")
  .get((req, res) => {
    res.status(200).send(json);
  })
  .all(send405Error);
  
apiRouter.use("/Topics", topicsRouter);
apiRouter.use("/Users", usersRouter);
apiRouter.use("/Articles", articlesRouter);
apiRouter.use("/Comments", commentsRouter);

module.exports = apiRouter;
