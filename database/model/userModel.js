//still working on the actual model for this thing.

const db = require("../dbConfig");

module.exports = {
  add,
  findAll,
  findBy,
  findById
};

const userProperties = ["username", "id", "saltiness"];

function findAll() {
  return db("users").select(userProperties);
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
    .select(userProperties)
    .where({ id })
    .first();
}
