const onReceiveToken = async (token) => {
  try {
    const response = await fetch("https://your-app-name.herokuapp.com/verify-recaptcha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const result = await response.json();

    if (result.success) {
      console.log("reCAPTCHA verified successfully");
      // Proceed with Firebase authentication
    } else {
      console.log("reCAPTCHA failed", result.error);
    }
  } catch (error) {
    console.error("reCAPTCHA validation error", error);
  }
};
