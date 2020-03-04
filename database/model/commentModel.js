const db = require("../dbConfig");

module.exports = {
  add,
  findAll,
  findBy,
  findById,
  removeSavedComment
};

const commentProperties = ["author", "comment_text", "id", "saltiness", "time"];

function findAll() {
  return db("comments").select(commentProperties);
}

function findBy(filter) {
  return db("comments")
    .select(commentProperties)
    .where(filter);
}

function add(comment) {
  return db("comments")
    .insert(comment, "id")
    .returning("*");
  // .then(ids => {
  //   const [id] = ids;
  //   return findById(id);
  // });
}

function findById(id) {
  return db("comments")
    .select(commentProperties)
    .where({ id })
    .first();
}

function removeSavedComment(id) {
  return db("saved_comments")
    .where({ id })
    .del();
}
