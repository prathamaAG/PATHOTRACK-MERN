const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 30002;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3001'
}));

// Helper function to generate a 6-digit OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Hardcoded password for testing purposes
const hardcodedPassword = "12345";

// Store OTP for verification (in production, use a more secure storage)
let storedOtp = '';
let otpEmail = '';

app.post('/login', async (req, res) => {
  const { password, email } = req.body;

  if (password === hardcodedPassword) {
    // Generate and send OTP
    const otp = generateOtp();
    storedOtp = otp; // Store OTP for later verification
    otpEmail = email; // Store email for sending OTP

    // Set up Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '<your-email-here>',
        pass: '<your-google-app-password-here>' // Use App Password if enabled
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    try {
      // Send OTP email
      await transporter.sendMail({
        from: '<your-email-here>',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is: ${otp}`,
      });

      console.log('OTP sent to email:', email);
      res.json({ success: true, message: 'OTP sent to your email!' });
    } catch (error) {
      console.error('Error sending OTP email:', error);
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ success: false, error: 'Invalid password' });
  }
});

app.post('/verify-otp', (req, res) => {
  const { otp } = req.body;

  if (otp === storedOtp) {
    storedOtp = ''; // Clear OTP after successful verification
    otpEmail = ''; // Clear email
    res.json({ success: true, message: 'OTP verified successfully!' });
  } else {
    res.status(400).json({ success: false, error: 'Invalid OTP' });
  }
});

app.post('/send-email', async (req, res) => {
  const { email, pdfBase64 } = req.body;
  if (!email || !email.trim()) {
    console.error('Error: No recipient email address provided.');
    return res.status(400).json({ success: false, error: 'No recipient email address provided.' });
  }

  console.log('Sending email with:', { email, pdfBase64 });

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '<your-email-here>',
      pass: '<your-google-app-password-here>'
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  try {
    let info = await transporter.sendMail({
      from: '<your-email-here>',
      to: email,
      subject: 'Your Invoice',
      text: 'Please find the attached invoice.',
      attachments: [
        {
          filename: 'invoice.pdf',
          content: pdfBase64,
          encoding: 'base64'
        }
      ]
    });

    console.log('Message sent: %s', info.messageId);
    res.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    if (!res.headersSent) {
      res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
``