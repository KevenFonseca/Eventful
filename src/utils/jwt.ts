import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const generateToken = (payload: object): string => {
    return jwt.sign(payload, process.env.SECRET_KEY!, {
        expiresIn: '1h'
    })
}