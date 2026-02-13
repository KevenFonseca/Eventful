import  { Router } from "express"
import { authMiddleware } from "../../middlewares/auth.midleware.js"
import { authorize } from "../../middlewares/role.midleware.js"
import * as registrationHandler from "./registration.controller.js"
import { UserRole } from "../users/user.types.js"

const router = Router()

// Create registration (Participant)
router.post('/:id/register', authMiddleware, authorize(UserRole.PARTICIPANT), registrationHandler.createRegistrationHandler)

// Get event participants (Creator)
router.get('/:id/participants', authMiddleware, authorize(UserRole.CREATOR), registrationHandler.getEventParticipantsHandler)

export default router