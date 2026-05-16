const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(to, otp) {
  await transporter.sendMail({
    from: '"MyApp" <your@gmail.com>',
    to,
    subject: "Your verification code",
    html: `<p>Your code is: <strong>${otp}</strong>. Expires in 10 minutes.</p>`,
  });
}

module.exports = { sendEmail };
