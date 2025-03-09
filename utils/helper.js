const nodemailer = require('nodemailer');

exports.generatePassword = (firstName, lastName, phone) =>{
  let part1 = firstName.substring(0, 2).toUpperCase();
  let part2 = lastName.substring(lastName.length - 2).toLowerCase();
  let part3 = phone.substring(phone.length - 4);
  return part1 + part2 + part3;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_SMTP,
    pass: process.env.PASSWORD_SMTP,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

exports.sendEmail = async (mailAlert) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_SMTP,
      to: mailAlert.email,
      subject: mailAlert.subject,
      html: mailAlert.message,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error",error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
