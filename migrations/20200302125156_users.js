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
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("comments");
  // .dropTableIfExists("saved_comments");
};

// what i'll need ↓

// {
//   "user": [
//     {
//       "uuid": "<uuid>",
//       "username": "<username>",
//       "saltiness_score": "<salty_score>",
//       "saltiness_rank": "<salty_rank>",
//       "percent_salty": "<pct_salty>",
//       "total_comments": "<total_comments>"
//     }
//   ]
// }

// what ill need for comment data ↓
// {
//     "comments": [
//       {
//         "uuid": "<uuid>",
//         "c_id": "<cid>",
//         "text": "<text>",
//         "saltiness_score": "<salty_score>",
//         "timestamp": "<timestamp>"
//       }
//     ]
//   }
