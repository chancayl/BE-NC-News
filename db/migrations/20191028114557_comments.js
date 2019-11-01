exports.up = function(knex) {
  return knex.schema.createTable("Comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable.text("author").references("Users.username").notNullable();
    commentsTable.integer("article_id").references("Articles.article_id").notNullable();
    commentsTable.integer("votes").defaultTo(0).notNullable();
    commentsTable.timestamp("created_at").defaultTo(knex.fn.now()).notNullable();
    commentsTable.text("body").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Comments");
};
