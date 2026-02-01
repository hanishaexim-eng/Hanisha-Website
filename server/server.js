const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gmail SMTP – use App Password, not account password
// https://support.google.com/accounts/answer/185833
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Health check – confirms server is up (no email)
app.get("/", (req, res) => {
  res.json({ ok: true, message: "Contact form API – POST /send to submit" });
});

app.post("/send", async (req, res) => {
  try {
    // Fail fast if Gmail not configured
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD in .env");
      return res.status(503).json({
        ok: false,
        error: "Email is not configured. Please contact the site owner.",
      });
    }

    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject) {
      return res.status(400).json({ ok: false, error: "Name, email and subject are required." });
    }

    // Recipient: use RECIPIENT_EMAIL so contact form goes to business, not sender account
    const recipientEmail = process.env.RECIPIENT_EMAIL || "hanishaexim@gmail.com";
    const mailOptions = {
      from: `"Hanisha EXIM Website" <${process.env.GMAIL_USER}>`,
      to: recipientEmail,
      replyTo: email,
      subject: `[Website] ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        message ? `Message:\n${message}` : "",
      ]
        .filter(Boolean)
        .join("\n\n"),
      html: [
        `<p><strong>Name:</strong> ${escapeHtml(name)}</p>`,
        `<p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>`,
        `<p><strong>Subject:</strong> ${escapeHtml(subject)}</p>`,
        message ? `<p><strong>Message:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>` : "",
      ]
        .filter(Boolean)
        .join(""),
    };

    await transporter.sendMail(mailOptions);
    res.json({ ok: true, message: "Email sent" });
  } catch (err) {
    // Log full error in terminal so you can fix Gmail config
    console.error("Send mail error:", err.message);
    if (err.response) console.error("Gmail response:", err.response);
    if (err.code) console.error("Error code:", err.code);
    // Generic message to client (don't expose auth details)
    res.status(500).json({ ok: false, error: "Failed to send email. Please try again later." });
  }
});

function escapeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.warn("WARNING: Set GMAIL_USER and GMAIL_APP_PASSWORD in .env for Gmail SMTP.");
    return;
  }
  try {
    await transporter.verify();
    console.log("Gmail SMTP ready – contact form emails will be sent from", process.env.GMAIL_USER);
  } catch (err) {
    console.warn("Gmail SMTP verify failed:", err.message);
    console.warn("Check .env: use Gmail App Password from https://myaccount.google.com/apppasswords");
  }
});
