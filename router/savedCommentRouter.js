// WIP
const router = require("express").Router();
const Favorites = require("../database/model/savedCommentModel");

router.post("/", (req, res) => {
  let favorite = req.body;
  //  let user = username?
  // comment.author = user.username
  Favorites.add(favorite)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// save comment by ID, register and login.

//
