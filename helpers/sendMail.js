//import nodemailer from "nodemailer"
const nodemailer = require("nodemailer");

export const sendEmail = (options) => {

  // process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    },
  });

  const mailOptions = {
    from: '"Robel1" <robelgulima1@gmail.com>', // sender address
    to: 'robelgulima@gmail.com', // list of receivers
    subject: options.subject, // Subject line
    //text: `Daily Report`, // plain text body
    html: options.text, // html body
  }

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info)
    }
  })
}
