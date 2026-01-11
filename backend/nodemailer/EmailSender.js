import {
  RESET_PASSWORD_SUCCESSFUL_EMAIL,
  RESET_PASSWORD_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_TEMPLATE,
} from "./EmailTemplate.js";
import { transporter } from "./nodemailer.config.js";

export const sendVerificationMail = (email, otp) => {
  const mailOptions = {
    from: '"Pawfect Match" <foradsonly98@gmail.com>',
    to: email,
    html: VERIFICATION_EMAIL_TEMPLATE.replace("123456", otp),
    category: "E-Mail Verification",
  };

  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Something went wrong!\n Error: ", error);
      } else {
        console.log("Email Sent: ", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendWelcomeEmail = (email, username) => {
  const mailOptions = {
    from: '"Pawfect Match" <foradsonly98@gmail.com>',
    to: email,
    html: WELCOME_TEMPLATE.replace("UserName", username),
    category: "Welcome Email",
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Something went wrong!\n Error: ", error);
      } else {
        console.log("Email Sent: ", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendResetPasswordMail = (email, url) => {
  const mailOptions = {
    from: '"Pawfect Match" <foradsonly98@gmail.com>',
    to: email,
    html: RESET_PASSWORD_TEMPLATE.replace("resetURL", url),
    category: "Welcome Email",
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Something went wrong!\n Error: ", error);
      } else {
        console.log("Email Sent: ", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const sendResetPasswordSuccessMail = (email, username) => {
  const mailOptions = {
    from: '"Pawfect Match" <foradsonly98@gmail.com>',
    to: email,
    html: RESET_PASSWORD_SUCCESSFUL_EMAIL.replace("username", username),
    category: "Welcome Email",
  };
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Something went wrong!\n Error: ", error);
      } else {
        console.log("Email Sent: ", info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
