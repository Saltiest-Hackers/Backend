const db = require("../dbConfig");

module.exports = {
  add,
  findAll,
  findBy,
  findById,
  removeSavedComment,
  updateComment
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
}

function findById(id) {
  return db("comments")
    .select(commentProperties)
    .where({ id })
    .first();
}

function removeSavedComment(id) {
  return db("comments")
    .where("id", id)
    .del();
}

function updateComment(id, changes) {
  return db("comments")
    .where("id", id)
    .update(changes)
    .returning("*");
}
