import jwt from "jsonwebtoken";

export const createJwtSaveInCookies = (res, userId) => {
  // Create JWT
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Save in cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return token;
};
