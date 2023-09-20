const express = require("express");
const router = express.Router();

const sendEmail = require("../utils/email");

router.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await sendEmail({
      email: process.env.SMTP_FROM_EMAIL,
      subject: "New Contact Form Submission",
      message: `Name: ${name}\nEmail:${email}\nMessage:${message}`,
    });
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.log("Error sending email", error);
    res
      .status(500)
      .json({ message: "An error occured while sending the email" });
  }
});
module.exports = router