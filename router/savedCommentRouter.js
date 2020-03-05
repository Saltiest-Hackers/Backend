const router = require("express").Router();
const Favorites = require("../database/model/savedCommentModel");
const restricted = require("../auth/authenticate-middleware");

router.get("/", restricted, (req, res) => {
  const user = req.decodedToken;
  console.log(user);
  Favorites.findAllByUser(user.subject).then(comments => {
    res.status(200).json(comments);
  });
});

router.post("/", (req, res) => {
  let favorite = req.body;

  Favorites.add(favorite)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Favorites.removeSavedComment(id)
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
      res.status(500).json(err.message);
    });
});

module.exports = router;
