import { getUserCount, getAllUsers } from "../models/userModel.js";

export async function getDashboardStats(req, res) {
  try {
    const [totalUsers, users] = await Promise.all([
      getUserCount(),
      getAllUsers()
    ]);

    res.json({
      totalUsers,
      users
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve dashboard data." });
  }
}
