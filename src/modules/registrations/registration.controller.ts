import { Response } from "express"
import { AuthRequest } from "../../middlewares/auth.midleware.js"
import * as registrationService from "./registration.service.js"
import QRCode from 'qrcode'
import { RegistrationModel } from './registration.model.js'

export const createRegistrationHandler = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Unauthorized' })
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

export const getRegistrationQRHandler = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Unathorized' })

        const registration = await RegistrationModel.findById(req.params.id)

        if (!registration) {
            return res.status(404).json({ error: 'Registration not found' })
        }

        if (registration.participant.toString() !== req.user.id) {
            return res.status(403).json({ error: 'Forbidden' })
        }

        const qr = await QRCode.toDataURL(registration.code)

        return res.json({ qr })

    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    } 
}

export const getMyRegistrationHandler = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'Unathorized'})
        }
    
        const registration = await registrationService.getMyRegistrations(req.user.id)

        return res.status(200).json(registration)
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
}

export const getRegistrationByIdHandler = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Unathorized'})

        const registration = await registrationService.getRegistrationById(req.params.id as string, req.user.id)

        return res.status(200).json(registration)

    } catch (error: any) {
        if (error.message === 'Registration not found') {
            return res.status(404).json({ error: error.message })
        }
        if (error.message === 'Forbidden') {
            return res.status(403).json({ error: error.message })
        }

        return res.status(400).json({ error: error.message })
    }
} 

export const updateReminderHandler = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: 'Unathorized'})

        const { reminderHours } = req.body
            
        await registrationService.setUpdateReminder(req.params.id as string, req.user.id, reminderHours)

        return res.status(200).json({ message: 'Reminders updated successfully' })

    } catch (error: any) {
        if (error.message === 'Registration not found') {
            return res.status(404).json({ error: error.message })
        }
        if (error.message === 'Forbidden') {
            return res.status(403).json({ error: error.message })
        }

        return res.status(400).json({ error: error.message })
    }
}