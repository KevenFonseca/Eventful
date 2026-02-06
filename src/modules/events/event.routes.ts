import { Router } from "express"
import { authMiddleware } from "../../middlewares/auth.midleware.js"
import { authorize } from "../../middlewares/role.midleware.js"
import * as eventsHandler from "./event.controller.js"
import { UserRole } from "../users/user.types.js"

const router = Router()

// create event router (Creator)
router.post('/events', authMiddleware, authorize(UserRole.CREATOR), eventsHandler.createEventHandler)

// List all available Events (Public)
router.get('/events', eventsHandler.getEventsHandler)

// List my events (Creator)
router.get('/events/my-events', authMiddleware, authorize(UserRole.CREATOR), eventsHandler.getMyEventsHandler)

// Get event by id (Public)
router.get('/events/:id', eventsHandler.getEventByIdHandler)

export default router