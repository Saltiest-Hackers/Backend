const router = require("express").Router();
const Comments = require("../database/model/commentModel");

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
