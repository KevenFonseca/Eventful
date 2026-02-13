import { z } from "zod"
import { UserRole } from "../user.types.js"

export const createUserSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    role: z.nativeEnum(UserRole).optional()
})

export type CreateUserDTO = z.infer<typeof createUserSchema>