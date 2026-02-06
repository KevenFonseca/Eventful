import { Request, Response, NextFunction } from "express"
import { ZodSchema } from "zod"

export const validateDTO = (schema: ZodSchema<any>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body)
            next()
        } catch (err: any) {
            return res.status(400).json({error: 'Invalid input'})
        }
    }
}