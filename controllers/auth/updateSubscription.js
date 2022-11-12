const { User } = require("../../models/user");

const updateSubscription = async (req, res) => {
  const { _id, email } = req.user;
  const { subscription } = req.body;
  await User.findByIdAndUpdate(_id, { subscription: subscription });
  res.status(200).json({
    email: email,
    subscription: subscription,
  });
};

module.exports = updateSubscription;
