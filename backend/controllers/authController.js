import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createUser,
  findUserByEmail,
  findUserById
} from "../models/userModel.js";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function validateInput({ name, email, password, phone, gender }) {
  if (!name || name.trim().length < 2) return "Full name must contain at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Please enter a valid email address.";
  if (!password || password.length < 6) return "Password must be at least 6 characters.";
  if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) return "Please enter a valid phone number.";
  if (!["Male", "Female", "Other"].includes(gender)) return "Please select a valid gender.";
  return null;
}

export async function register(req, res) {
  try {
    const name = String(req.body.name || "").trim();
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");
    const phone = String(req.body.phone || "").trim();
    const gender = String(req.body.gender || "");

    const validationError = validateInput({ name, email, password, phone, gender });
    if (validationError) return res.status(400).json({ message: validationError });

    const existing = await findUserByEmail(email);
    if (existing) return res.status(409).json({ message: "This email is already registered." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const id = await createUser({ name, email, password: hashedPassword, phone, gender });

    const user = await findUserById(id);
    return res.status(201).json({
      message: "Registration successful.",
      user
    });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ message: "This email is already registered." });
    }
    console.error(error);
    return res.status(500).json({ message: "Server error during registration." });
  }
}

export async function login(req, res) {
  try {
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || "");

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid email or password." });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid email or password." });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    const safeUser = await findUserById(user.id);
    return res.json({ message: "Login successful.", token, user: safeUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error during login." });
  }
}
