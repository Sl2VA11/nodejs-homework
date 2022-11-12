const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "slava.grobovoy1719@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    return error.message;
  }
};

module.exports = sendEmail;
