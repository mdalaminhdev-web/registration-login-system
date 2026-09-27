import { findUserById, getAllUsers } from "../models/userModel.js";

export async function getMe(req, res) {
  try {
    const user = await findUserById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found." });
    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve user." });
  }
}

export async function listUsers(req, res) {
  try {
    const users = await getAllUsers();
    res.json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve users." });
  }
}
