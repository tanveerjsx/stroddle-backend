const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service:'gmail',
    secure:false,
    auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.EMAIL_PASSWORD
    }
});
const sendEmail = async (user, req, res) => {
  const token = user.generateVerificationToken();
  const mailOptions = {
    to: user.email,
    from: process.env.FROM_EMAIL,
    subject: 'Account Verification Code',
    text: `Hi ${user.username} \n 
                Please enter this code ${token.token} to verify your account. \n\n`,
  };
  try {
    const tokenSaved = await token.save();
    if (!tokenSaved) {
      return res.status(500).json({ message: err.message });
    }
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "email sent sucessfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

module.exports = {
  sendEmail
};
