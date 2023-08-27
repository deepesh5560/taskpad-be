const jwt = require("jsonwebtoken");
const userSchema = require("../models/auth/signUp");

exports.createJWT = (userName, email, userId, duration) => {
  const payload = {
    userName,
    email,
    userId,
    duration,
  };
  return jwt.sign(payload, process.env.TOKEN_SECRET, {
    expiresIn: duration,
  });
};

exports.verifyUser = (req, res, next) => {
  let token = "";
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(500).json({ errors: err });
      }
      if (decoded) {
        userSchema
          .findById(decoded.userId)
          .then((user) => {
            if (!user) {
              return res.status(404).json({
                errors: [{ user: "User not found" }],
              });
            } else {
              req.user = {
                id: decoded.userId,
              };
              next();
            }
          })
          .catch((err) => {
            res.status(500).json({
              errors: [{ error: "Something went wrong" }],
            });
          });
      }
    });
  } else {
    res.status(500).json({ errors: [{ user: "Unauthorized" }] });
  }
};
