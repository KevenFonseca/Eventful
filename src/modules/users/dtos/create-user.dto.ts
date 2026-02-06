import { z } from "zod"
import { UserRole } from "../user.types.js"

export const createUserSchema = z.object({
    name: z.string().min(3),
    emai: z.email(),
    password: z.string().min(6),
    role: z.enum(UserRole).optional()
})

export type CreateUserDTO = z.infer<typeof createUserSchema>