import { Response } from "express"
import { AuthRequest } from "../../middlewares/auth.midleware.js"
import * as registrationService from "./registration.service.js"

export const createRegistrationHandler = async (req: AuthRequest, res: Response) => {
    try {
        const registration = await registrationService.createRegistration(
            req.user!.id,
            req.params.id as string
        )

        return res.status(201).json(registration)
    } catch (error: any) {
        if (error.message === 'Event not found') {
            return res.status(404).json({ error: error.message })
        }
        return res.status(400).json({ error: error.message })
    }
}

export const getEventParticipantsHandler = async (req: AuthRequest, res: Response) => {
    try {
        const participants = await registrationService.getEventParticipants(
            req.params.id as string,
            req.user!.id
        )

        return res.status(200).json(participants)
    } catch (error: any) {
        if (error.message === 'Event not found') {
            return res.status(404).json({ error: error.message })
        }
        if (error.message === 'Unauthorized') {
            return res.status(403).json({ error: error.message })
        }
        return res.status(400).json({ error: error.message })
    }
}
