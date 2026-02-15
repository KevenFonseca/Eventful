import  { Router } from "express"
import { authMiddleware } from "../../middlewares/auth.midleware.js"
import { authorize } from "../../middlewares/role.midleware.js"
import * as registrationHandler from "./registration.controller.js"
import { UserRole } from "../users/user.types.js"

const router = Router()

// Get my registrations (Participant)
router.get('/my', authMiddleware, authorize(UserRole.PARTICIPANT), registrationHandler.getMyRegistrationHandler)

// Create registration (Participant)
router.post('/:id/register', authMiddleware, authorize(UserRole.PARTICIPANT), registrationHandler.createRegistrationHandler)

// Get registration by id
router.get('/:id', authMiddleware, authorize(UserRole.PARTICIPANT), registrationHandler.getRegistrationByIdHandler)

// Get event participants (Creator)
router.get('/:id/participants', authMiddleware, authorize(UserRole.CREATOR), registrationHandler.getEventParticipantsHandler)

// Get QR code
router.get('/:id/qr', authMiddleware, authorize(UserRole.PARTICIPANT), registrationHandler.getRegistrationQRHandler)

export default router