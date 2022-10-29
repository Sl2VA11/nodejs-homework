const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;


const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    res.json({
      status: 401,
      message: "Email or password is wrong",
    });
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    res.json({
      status: 401,
      message: "Email or password is wrong",
    });
  }

  const payload = {
    id: user._id
  }
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, {token})
  res.json({
    token: token,
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = login;
