const { Conflict } = require("http-errors");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

const { User } = require("../../models");
const { sendEmail } = require("../../helpers");

const register = async (req, res) => {
  const { name, email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const avatarUrl = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const verificationToken = nanoid();
  await User.create({
    name,
    email,
    password: hashPassword,
    subscription,
    avatarUrl,
    verificationToken,
  });

  const mailToUser = {
    to: email,
    subject: "Verification you email adress",
    html: `<a target="_blank" href="http://localhost:3000/api/users/${verificationToken}">Click to confirm your email</a>`,
  };
  await sendEmail(mailToUser);
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        name: name,
        email: email,
        subscription: subscription,
        avatarUrl,
        verificationToken,
      },
    },
  });
};


module.exports = register;
