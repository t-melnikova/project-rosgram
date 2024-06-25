const authService = require("../services/auth");
module.exports = async function (req, res, next) {
  const { token } = req.headers;
  if (!token) {
    return res.sendStatus(403);
  }
  try {
    const { userId } = req.body;
    await authService.checkAuthorization(userId, token);
    next();
  } catch (error) {
    if (error.message === "User haven't access token") {
      return res.sendStatus(403);
    }
    if (error.message === "Access token invalid") {
      return res.sendStatus(401);
    }
    console.log(error);
    return res.sendStatus(500);
  }
};
