import { Router } from "express";
import { UserService } from "../services/userService";
import { validateDto } from "../middlewares/validate";
import { UserUpdateDto } from "../dto/user-update.dto";
import { upload } from "../middlewares/upload";



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

// DELETE user
router.delete("/:id", authenticate,, authorizeRoles("admin") async (req, res) => {
  try {
    const deleted = await userService.delete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete user", error: error.message });
  }
});

//Update user
router.put("/:id", validateDto(UserUpdateDto), async (req, res) => {
    try {
      const updated = await userService.update(req.params.id, req.body);
      if (!updated) return res.status(404).json({ message: "User not found" });
      res.status(200).json(updated);
    } catch (error) {
      res.status(400).json({ message: "Failed to update user", error: error.message });
    }
  });

  router.post(
    "/:id/profile-picture",
    authenticate,
    upload.single("avatar"), // Field name is 'avatar'
    async (req, res) => {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
  
      // Here, you can also update user's profile with file path
      res.status(200).json({ message: "Upload successful", file: req.file.filename });
    }
  );

export default router;
