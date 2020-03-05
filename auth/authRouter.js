// const router = require("express").Router();
// const Comments = require("../database/model/savedCommentModel");

// router.delete("/comments/:id", (req, res) => {
//   const { id } = req.params;

//   Comments.removeSavedComment(id)
//     .then(deleted => {
//       if (deleted) {
//         res.json({ removed: deleted });
//       } else {
//         res
//           .status(404)
//           .json({ message: "Could not find comment with given id" });
//       }
//     })
//     .catch(err => {
//       res.status(500).json(err.message);
//     });
// });

// module.exports = router;
