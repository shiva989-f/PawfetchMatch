import { User } from "../model/UserModel.js";

export const verifiedUser = async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  if (!user || !user.isVerified) {
    return res
      .status(401)
      .json({ message: "Unauthorized user, please login!", success: false });
  }
  req.userData = user;
  next();
};
