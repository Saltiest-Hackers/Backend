const router = require("express").Router();
const Comments = require("../database/model/commentModel");
const restricted = require("../auth/authenticate-middleware");

router.get("/", (req, res) => {
  const { id } = req.params;

  Comments.findAll(id)
    .then(comment => {
      res.status(200).json({ comment });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Failed to GET the all comments."
      });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Comments.findById(id)
    .then(commentId => {
      res.status(200).json({ commentId });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Failed to GET the specified Comment by ID."
      });
    });
});

router.post("/", restricted, (req, res) => {
  let comment = req.body;
  comment.author = req.decodedToken.username;
  comment.saltiness = 1;
  comment.time = new Date().getTime();
  console.log(req.decodedToken);

  Comments.add(comment)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

router.delete("/:id", restricted, (req, res) => {
  const { id } = req.params;

  Comments.removeSavedComment(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not delete comment with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete comment" });
    });
});

router.put("/:id", restricted, (req, res) => {
  const { id } = req.params;
  const { body } = req;

  Comments.updateComment(id, body)
    .then(updated => {
      res.status(201).json({ updated });
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

module.exports = router;
