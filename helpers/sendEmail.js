const nodemailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_USER, EMAIL_PASS } = process.env;

const sendEmail = async (data) => {
  const nodemailerConfig = {
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  };

  const transporter = nodemailer.createTransport(nodemailerConfig);

  const email = { ...data, from: "aleksandr.work3@gmail.com" };

  try {
    await transporter.sendMail(email);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendEmail;
