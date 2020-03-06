const router = require("express").Router();
const Favorites = require("../database/model/savedCommentModel");
const restricted = require("../auth/authenticate-middleware");

router.get("/", restricted, async (req, res) => {
  const user = req.decodedToken;
  console.log(user);
  try {
    const comments = await Favorites.findAllByUser(user.subject);
    if (comments.length > 0) {
      res.status(200).json(comments);
    } else {
      res.status(200).json({ message: "No saved comments." });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/", restricted, (req, res) => {
  let favorite = req.body;

  Favorites.add(favorite)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", restricted, async (req, res) => {
  const { id } = req.params;
  const savedComment = await Favorites.findBy({ id });
  // make sure it exists. if not send a 404
  if (!savedComment) {
    res
      .status(404)
      .json({ message: "Could not find saved comment with given id." });
    return;
  }
  const user = req.decodedToken;
  const userId = user.subject;
  console.log(savedComment, userId);

  // make sure that saved comment belongs to the user trying to delete it
  if (userId != savedComment.user_id) {
    res.status(401).json({ message: "Unauthorized..." });
    return;
  }
  // comment exists and it belongs to the authenticated user TO PROCEED WITH DELETION. ;)
  Favorites.removeSavedComment(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      }
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
