/*Создай файлик, который будет типа сервисом/хелпером
и сделай там валидаторы для пост запросов и в комменты и в посты.
Это должны быть мидлвари (middleware)
Pоут для получения поста с комментами тоже нужен всё-таки */

function validatePost(req, res, next) {
  const { userId, title, body } = req.body;
  if (!userId || !title || !body) {
    return res.status(400).json({ error: "Вы не заполнили обязательные поля" });
  }
  next();
}

function validateComment(req, res, next) {
  const { postId, name, email, body } = req.body;
  if (!postId || !name || !email || !body) {
    return res.status(400).json({ error: "Вы не заполнили обязательные поля" });
  }
  next();
}
module.exports = validatePost;
module.exports = validateComment;
