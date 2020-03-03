//still working on the actual model for this thing.

const db = require("../dbConfig");

module.exports = {
  add,
  // removeSavedComment
  find,
  findBy,
  findById
};

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users")
    .select("id", "username", "password")
    .where(filter);
}

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function findById(id) {
  return db("users")
    .select("id", "username")
    .where({ id })
    .first();
}

// function removeSavedComment(id) {
//   return db("savedcomment")
//     .where({ id })
//     .del();
// }
