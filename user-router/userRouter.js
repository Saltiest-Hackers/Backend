const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Users = require("../database/model/userModel");
const secrets = require("../config/secrets");
const jwt = require("jsonwebtoken");

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "8h"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);

  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res
          .status(401)
          .json({ message: "These credentials are not even close to valid." });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
