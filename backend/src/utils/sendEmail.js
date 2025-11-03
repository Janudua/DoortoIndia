const nodemailer = require('nodemailer');

exports.sendEmail = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
  
  // Send email
  const info = await transporter.sendMail({
    from: `${process.env.EMAIL_FROM}`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
  
  console.log('Message sent: %s', info.messageId);
};
