import { Router } from "express";
import { UserService } from "../services/userService";
import { validateDto } from "../middlewares/validate";
import { UserUpdateDto } from "../dto/user-update.dto";



const router = Router();
const userService = new UserService();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error: error.message });
  }
});

// GET user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: "Invalid ID format", error: error.message });
  }
});

// UPDATE user
router.put("/:id", async (req, res) => {
  try {
    const updated = await userService.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Failed to update user", error: error.message });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await userService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete user", error: error.message });
  }
});

router.put("/:id", validateDto(UserUpdateDto), async (req, res) => {
    const updated = await userService.update(req.params.id, req.body);
    res.json(updated);
  });

export default router;
