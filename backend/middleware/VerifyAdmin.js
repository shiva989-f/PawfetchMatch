import { User } from "../model/UserModel.js";

export const verifyAdmin = async (req, res, next) => {
  const user = await User.findById(req.user.userId);
  if (!user || !user.isVerified) {
    return res
      .status(401)
      .json({ message: "Unauthorized user, please login!", success: false });
  }
  if (user.role !== "admin") {
    return res
      .status(401)
      .json({ message: "Unauthorized user!", success: false });
  }
  req.userData = user;
  next();
};
