const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config()


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL, 
    pass: process.env.PASS, 
  },
});


app.post('/send-email', (req, res) => {
  const { to, subject, text ,html } = req.body;

  const mailOptions = {
    from: 'enigma.vssut@gmail.com', 
    to,
    subject,
    text,
    html,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Failed to send email' });
    }

    console.log('Email sent: ' + info.response);
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
