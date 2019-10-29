const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/indexData");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsInsertions = knex("Topics").insert(topicData);
      return topicsInsertions.returning("*");
    })
    .then(topicsInsertions => {
      const usersInsertions = knex("Users").insert(userData);
      return usersInsertions.returning("*");
    })
    .then(usersInsertions => {
      const myData = formatDates(articleData);
      const formatedArticle = knex("Articles").insert(myData);
      return formatedArticle.returning("*");
    })
    .then(formatedArticle => {
      const titleById = makeRefObj(formatedArticle);
      const formatedComments = formatComments(commentData, titleById);
      return knex("Comments").insert(formatedComments);
    });
};
