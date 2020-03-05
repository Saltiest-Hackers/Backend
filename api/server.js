const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authenticate = require("../auth/authenticate-middleware");
const userRouter = require("../router/userRouter");
const savedCommentRouter = require("../router/savedCommentRouter");
const commentRouter = require("../router/commentRouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/saved-comments", savedCommentRouter);
server.use("/api/user", userRouter);
server.use("/api/comment", commentRouter);
server.use("/api", authenticate);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
