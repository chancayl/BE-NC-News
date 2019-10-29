exports.up = function(knex) {
  return knex.schema.createTable("Topics", topicTable => {
    topicTable.string("slug").primary();
    topicTable.string("description").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("Topics");
};
