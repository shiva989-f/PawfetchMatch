import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const jwtToken = req.cookies.token;
  if (!jwtToken) {
    return res
      .status(401)
      .json({ success: false, message: "Unauthorized user, Please Login!" });
  }

  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized user, Please Login!",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong!", error, success: false });
  }
};
