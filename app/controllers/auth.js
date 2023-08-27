// const loginSchema = require("../models/auth/login");
const userSchema = require("../models/auth/signUp");
const { createJWT, verifyUser } = require("../utils/jwt");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { userName, email, password, confirmPassword } = req.body;

    if (!userName) {
      res.status(400).json({ error: "userName is required" });
    }
    if (!email) {
      res.status(400).json({ error: "email is required" });
    }

    if (!password) {
      res.status(400).json({ error: "password is required" });
    }

    if (!confirmPassword) {
      res.status(400).json({ error: "confirmPassword is required" });
    }
    if (password !== confirmPassword) {
      res
        .status(400)
        .json({ error: "confirmPassword and password are not same" });
    }

    const findMail = await userSchema.findOne({ email: email });

    if (findMail) {
      res.status(400).json({ error: "user already exists" });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async (err, hash) => {
          if (err) throw err;
          const createUser = await userSchema.create({
            username: userName,
            email: email,
            password: hash,
          });
          if (createUser) {
            const Token = createJWT(userName, email, createUser._id, "30d");

            const options = {
              userName: userName,
              email: email,
              userId: createUser._id,
            };

            res.status(200).send({
              data: options,
              token: Token,
              message: "your account has been created successfully",
            });
          }
        });
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.login = async (req, res) => {
  let { email, password } = req.body;
  let errors = [];

  if (!email) {
    errors.push({ email: "Required" });
  }

  if (!password) {
    errors.push({ passowrd: "Required" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  await userSchema
    .findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          errors: [{ user: "User not found" }],
        });
      } else {
        bcrypt
          .compare(password, user.password)
          .then((isMatch) => {
            if (!isMatch) {
              return res.status(400).json({
                errors: [
                  {
                    password: "Incorrect",
                  },
                ],
              });
            }
            let access_token = createJWT(
              user.username,
              user.email,
              user._id,
              "30d"
            );
            jwt.verify(
              access_token,
              process.env.TOKEN_SECRET,
              (err, decoded) => {
                if (err) {
                  res.status(500).json({ errors: err, e2: "e1" });
                }
                if (decoded) {
                  return res.status(200).json({
                    success: true,
                    token: access_token,
                    result: {
                      name: user.username,
                      email: user.email,
                      id: user._id,
                    },
                  });
                }
              }
            );
          })
          .catch((err) => {
            res.status(500).json({ errors: err, e2: "e2" });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ errors: err, e2: "e3" });
    });
};
