exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments("id");
      users
        .string("username", 128)
        .notNullable()
        .unique();
      users.string("password", 128).notNullable();
      users.string("saltiness", 2);
    })

    .createTable("comments", tbl => {
      tbl.increments("id");
      tbl.string("author", 128).notNullable();
      tbl.string("comment_text", 256).notNullable();
      tbl.string("parent_id", 128);
      tbl.float("saltiness", 2);
      tbl
        .integer("time")
        .unsigned()
        .notNullable();
      tbl
        .integer("user_id")
        .notNullable()
        .references("users.id");
    })
    .createTable("saved_comments", tbl => {
      tbl.increments("id");
      tbl
        .integer("user_id")
        .unsigned()
        .notNullable();
      tbl
        .integer("comment_id")
        .unsigned()
        .notNullable();
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("users")
    .dropTableIfExists("comments")
    .dropTableIfExists("saved_comments");
};
