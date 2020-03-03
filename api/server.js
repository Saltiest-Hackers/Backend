const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const authenticate = require("../auth/authenticate-middleware");
const userRouter = require("../user-router/userRouter");
const authRouter = require("../auth/authRouter");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api", userRouter);
server.use("/api", authenticate, authRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
