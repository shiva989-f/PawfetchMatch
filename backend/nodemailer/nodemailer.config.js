import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465, // GMail Port (fixed)
  // Sender email
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
