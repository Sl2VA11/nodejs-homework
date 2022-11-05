const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models/user");
const avatarDir = path.join(__dirname, "../../", "public", "avatars");
const Jimp = require("jimp");
const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const resultUpload = path.join(avatarDir, originalname);
  const resizeAvatar = await Jimp.read(resultUpload);
  await resizeAvatar.resize(250, 250).write(resultUpload);
  await fs.rename(tempUpload, resultUpload);
  const avatarUrl = path.join("avatars", originalname);
  

  await User.findByIdAndUpdate(_id, avatarUrl);
  res.json({
    avatarUrl,
  });
};

module.exports = updateAvatar;
