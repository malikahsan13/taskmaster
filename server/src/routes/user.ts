import { Router } from "express";
import { UserService } from "../services/user.service";

const router = Router();
const userService = new UserService();

router.get("/", async (req, res) => {
  const users = await userService.getAll();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json(user);
  } catch {
    res.status(400).json({ message: "Invalid ID format" });
  }
});



export default router;
