import { Response, NextFunction } from "express"
import { AuthRequest } from "./auth.midleware.js"
import { UserRole } from "../modules/users/user.types.js"

export const authorize = (role: UserRole) => (req: AuthRequest, res: Response, next: NextFunction) => {
    if(req.user?.role !== role) return res.status(403).json({ message: "Access denied"})

    next()
}