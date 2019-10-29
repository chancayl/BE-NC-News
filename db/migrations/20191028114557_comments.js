exports.up = function(knex) {
  return knex.schema.createTable("Comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable.text("author").references("Users.username");
    commentsTable.integer("article_id").references("Articles.article_id");
    commentsTable.integer("votes").defaultTo(0);
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now());
    commentsTable.text("body").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Comments");
};
