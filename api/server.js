const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authenticate = require("../auth/authenticate-middleware");
const userRouter = require("../router/userRouter");
const authRouter = require("../auth/authRouter");
const commentRouter = require("../router/commentRouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api", userRouter);
server.use("/test", commentRouter);
server.use("/api", authenticate, authRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
