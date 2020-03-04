const router = require("express").Router();
const Comments = require("../database/model/commentModel");

router.post("/addcomment", (req, res) => {
  let comment = req.body;
  //  let user = username?
  // comment.author = user.username
  Comments.add(comment)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
