const express = require("express");
const sequelize = require("./sequelize");
const commentsRouter = require("./routers/comment");
const postsRouter = require("./routers/post");
const userRouter = require("./routers/user");

const index = express();
index.use(express.json());

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Соединение с базой данных успешно установлено.");

    await sequelize.sync({ force: true });
    console.log("Таблицы успешно созданы на основе моделей.");

    const PORT = 3000;
    index.listen(PORT, () => {
      console.log(`Сервер запущен на порте ${PORT}`);
    });
  } catch (error) {
    console.error("Ошибка при подключении к базе данных:", error);
  }
}

startServer()
  .then(() => {
    index.use("/api/v1/comments", commentsRouter);
    index.use("/api/v1/posts", postsRouter);
    index.use("/api/v1/users", userRouter);
  })
  .catch((error) => {
    console.error("Ошибка при старте сервера:", error);
  });
