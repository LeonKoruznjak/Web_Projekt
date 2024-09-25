const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/authmiddlewares");

router.post("/", async (req, res) => {
  const { userName, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      userName: userName,
      password: hash,
    });
    res.json("Success");
  });
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await Users.findOne({
      where: {
        userName: userName,
      },
    });

    if (!user) {
      return res.json({ error: "User doesn't exist!" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }

    const accessToken = sign(
      { userName: user.userName, id: user.id },
      "importantsecret"
    );
    res.json({ token: accessToken, userName: userName, id: user.id });
  } catch (error) {
    res.status(500).json({ error: "An error occurred during login." });
  }
});

router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

module.exports = router;
