const db = require("../dbConfig");
const Comments = require("./commentModel");

module.exports = {
  add,
  findAllByUser,
  findBy,
  // findById,
  removeSavedComment
};

function findAllByUser(userId) {
  return db("comments as c")
    .join("saved_comments as sc", "sc.comment_id", "c.id")
    .where({ "sc.user_id": userId })
    .select("c.author", "c.comment_text", "c.id", "c.saltiness", "c.time");
}

function findBy(filter) {
  return db("saved_comments")
    .select(savedCommentProperties)
    .where(filter);
}

function add(comment) {
  return db("saved_comments")
    .insert(comment, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function removeSavedComment(id) {
  return db("saved_comments")
    .where({ id })
    .del();
}
