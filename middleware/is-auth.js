const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decoedToken;
  try {
    decoedToken = jwt.verify(token, "myKey");
  } catch (err) {
    req.isAuth = false;
    return next();
  }
  if (!decoedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decoedToken.userId;
  next();
};
