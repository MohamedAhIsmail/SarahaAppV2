import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { emailTemplate } from './emailTemplate.js';
dotenv.config({});


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});




const sendEmail  = async (email, url) => {

  const info = await transporter.sendMail({
    from: '"SarahaApp 👻" <elsakalinkedin@gmail.com>',
    to: email,
    subject: "Thanks For Registration ✔",
    text: "Hello world?",
    html: emailTemplate(url),
  });

  console.log("Message sent: %s", info.messageId);

};




// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// });


// const sendEmail = async (email, subject, userName) => {
//   try {
//     const mailOptions = {
//       from: '"SarahaAPP 👻" <SarahaApp@gnmail.com>',
//       to: email,
//       subject: subject,
//       text: `Hello ${userName}, Please Confirm Your Email`,
//       html: emailTemplate()
//     };

//     await transporter.sendMail(mailOptions);
    
//   } catch (error) {
//     console.log('Email not sent:', error);
//   }
// };

export default sendEmail;