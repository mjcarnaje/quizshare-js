const jwt = require("jsonwebtoken");

module.exports.generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET_KEY,
    { expiresIn: 60 * 60 * 60 }
  );
};
