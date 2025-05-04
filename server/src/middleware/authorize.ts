import { Request, Response, NextFunction } from "express";

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as { role?: string }; // assuming you attach decoded token in auth middleware

    if (!user || !roles.includes(user.role || "")) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    next();
  };
};
