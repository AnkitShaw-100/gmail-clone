import express from "express";
import Email from "../models/Email.js";
import auth from "../middlewares/auth.js";
import { validateBody } from "../middlewares/validate.js";
import { createEmailSchema } from "../validators/emailValidator.js";

const router = express.Router();

// Create a new email (send email)
router.post("/", auth, validateBody(createEmailSchema), async (req, res) => {
  try {
    console.log(req.body, req.user.email);
    const { to, subject, body } = req.body;
    // 'from' is set from logged-in user
    const from = req.user.email;
    const email = new Email({ from, to, subject, body });
    await email.save();
    res.status(201).json(email);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all emails for the logged-in user (inbox)
// Get all emails for the logged-in user (inbox and sent)
router.get("/", auth, async (req, res) => {
  try {
    const userEmail = req.user.email;
    // Find emails where 'to' or 'from' is the logged-in user
    const emails = await Email.find({
      $or: [
        { to: userEmail },
        { from: userEmail }
      ]
    }).sort({ createdAt: -1 });
    res.json(emails);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// (Optional) Mark email as read
router.patch("/:id/read", auth, async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) return res.status(404).json({ message: "Email not found" });
    // Only recipient can mark as read
    if (email.to !== req.user.email)
      return res.status(403).json({ message: "Not allowed" });
    email.read = true;
    await email.save();
    res.json(email);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete email by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    // console.log("deleting...");
    const email = await Email.findById(req.params.id);
    if (!email) return res.status(404).json({ message: "Email not found" });
    // Only sender or recipient can delete
    if (email.to !== req.user.email && email.from !== req.user.email)
      return res.status(403).json({ message: "Not allowed" });
    await email.deleteOne();
    res.json({ message: "Email deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a reply to an email (conversation)
router.patch("/:id/reply", auth, async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) return res.status(404).json({ message: "Email not found" });
    // Only sender or recipient can reply
    if (email.to !== req.user.email && email.from !== req.user.email)
      return res.status(403).json({ message: "Not allowed" });
    const { body } = req.body;
    if (!body || !body.trim()) return res.status(400).json({ message: "Reply body required" });
    email.replies.push({ from: req.user.email, body });
    await email.save();
    res.json(email);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
