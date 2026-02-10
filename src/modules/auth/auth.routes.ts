import { Router } from "express"
import { signup, login } from "./auth.controller.js"
import { validateDTO } from "../../middlewares/validateDTO.js"
import { createUserSchema } from "../users/dtos/create-user.dto.js"
import { loginUserSchema } from "../users/dtos/login-user.dto.js"

const authRoute = Router()

// Register
authRoute.post('/auth/signup', validateDTO(createUserSchema), signup)

// Login
authRoute.post('/auth/login', validateDTO(loginUserSchema), login)

export default authRoute