const router = require("express").Router();
const Users = require("../database/model/userModel");

router.delete("/comment/:id", (req, res) => {
  const { id } = req.params;

  Users.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find comment with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete comment" });
    });
});

module.exports = router;
