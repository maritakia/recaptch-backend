// server.js
const express = require('express');
const axios = require('axios');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Route to handle reCAPTCHA token verification
app.post('/verify-recaptcha', async (req, res) => {
  const { token } = req.body; // Get the reCAPTCHA token from the request body
  const secretKey = '6Lcuky0qAAAAAEa_sZ6vqEky-pIO1d8LG-8y21Uf'; // Replace this with your secret key from Google

  try {
    // Make a POST request to Google's reCAPTCHA API
    const response = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
      params: {
        secret: secretKey,
        response: token,
      },
    });

    const data = response.data;

    // Check if reCAPTCHA verification was successful
    if (data.success) {
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false, error: data['error-codes'] });
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
