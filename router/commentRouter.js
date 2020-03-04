const router = require("express").Router();
const Comments = require("../database/model/commentModel");

router.get("/", (req, res) => {
  const { id } = req.params;

  Comments.findAll(id)
    .then(comment => {
      res.status(200).json({ comment });
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "Failed to GET the specified Comment by ID."
      });
    });
});

router.post("/", (req, res) => {
  let comment = req.body;

  Comments.add(comment)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error.message);
    });
});

module.exports = router;
