const nodemailer = require("nodemailer");
const nodemailerConfig = require("./nodemailerConfig");

const sendEmail = async ({ to, subject, html }) => {
  const testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport(nodemailerConfig);

  //no need to add await as in the filer where we will be calling this function we will use await.sendEmail()
  return transporter.sendMail({
    // from: `"Shaharin Ahmed" <${process.env.email}>`,
    from: `"Sports-shop admin" <sports-shop@gmail.com>`, //sender address
    to,
    subject,
    html,
  });
};
module.exports = sendEmail;
