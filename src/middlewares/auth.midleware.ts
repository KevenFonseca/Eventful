import { Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

interface JwtPayload {
    id: string
    role?: string
}

export interface AuthRequest extends Request {
    user?: JwtPayload
}


export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) return res.status(403).json({ error: 'Token not provided' })

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload
        req.user = decoded
        next()
    } catch (err) {
        return res.status(401).json({error: 'Invalid token'})
    }
}