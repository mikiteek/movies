const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const sendMailHandler = async (emailTo, verifyToken) => {
  const msg = {
    to: emailTo,
    from: process.env.SENDGRID_EMAIL_FROM,
    subject: 'Welcome! Confirm your email',
    text: 'and easy to do anywhere, even with Node.js',
    html: `<p>Hello, please follow the <a href="http://localhost:3000/auth/verify/${verifyToken}">link</a> for verify your token</p>`,
  };
  try {
    await sgMail.send(msg);
    console.log('Email sent');
  }
  catch(e) {
    console.log(e);
  }
}

module.exports = sendMailHandler;