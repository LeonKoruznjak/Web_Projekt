const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");

const db = require("./models");
app.use(cors());

//Routers
const postRouter = require("./routes/posts");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/users");
app.use("/auth", usersRouter);
const likesRouter = require("./routes/likes");
app.use("/likes", likesRouter);

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
