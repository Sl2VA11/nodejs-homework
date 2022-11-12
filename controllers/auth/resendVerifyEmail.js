const { NotFound } = require("http-errors");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");
const { User } = require("../../models");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw NotFound(404, `User with email # ${email} # not found`);
  }

  if (user.verify) {
    throw NotFound(400, `This email ${email} has already been verified.`);
  }
  const verificationToken = nanoid();
  const mailToUser = {
    to: email,
    subject: "Verification you email adress",
    html: `<a target="_blank" href="http://localhost:3000/api/users/${verificationToken}">Click to confirm your email</a>`,
  };
  await sendEmail(mailToUser);

  res.status(200).json({ message: "Verification email sent" });
};
module.exports = {
  resendVerifyEmail,
};
