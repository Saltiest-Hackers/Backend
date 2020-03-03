exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments();

    users
      .string("username", 128)
      .notNullable()
      .unique();
    users.string("password", 128).notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
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
