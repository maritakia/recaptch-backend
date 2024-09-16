const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

app.post('/verify-recaptcha', async (req, res) => {
  const { token } = req.body;
  const secretKey = '6LeEtUUqAAAAAARgwojV3Rn8AFr-YJpyp7wUCBWA';

  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`
    );
    const data = response.data;

    if (data.success) {
      return res.json({ success: true });
    } else {
      return res.status(400).json({ success: false, error: data['error-codes'] });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

