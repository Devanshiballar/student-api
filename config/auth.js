const jwt = require("jsonwebtoken");
exports.varifyStudent = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      error: "Access denied/unauthorized access",
    });
  }
  try {
    token = token.split(" ")[1];
    if (token === "nul" || !token) {
      return res.status(401).send({
        error: "unauthorized request",
      });
    }
    let verifiedUser = jwt.verify(token, "devanshi16");
    if (!verifiedUser)
      return res.status(401).json({
        error: "unauthorized request",
      });
    req.std = verifiedUser;
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.IsUser = async (req, res, next) => {
  const {stdRole} = req.std
  if (stdRole === 0) {
    console.log('user exists')
      next();
  } else {
      return res.status(401).send("Unauthorized!");

  }
}
