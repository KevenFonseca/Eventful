import { Response } from "express"
import { AuthRequest } from "../../middlewares/auth.midleware.js"
import { createEventSchema } from "./dtos/create-event.dto.js"
import * as eventService from "./event.service.js"

export const createEventHandler = async (req: AuthRequest, res: Response) => {
    try {
        const data = createEventSchema.parse(req.body)

        const event = await eventService.createEvent(
            data,
            req.user!.id
        )

        return res.status(201).json(event)
    } catch (error: any) {
        if (error.name === 'ZodError') {
            return res.status(400).json({ message: 'Invalid data', errors: error.errors})
        }
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getEventsHandler = async (req: AuthRequest, res: Response) => {
    try {
        const events = await eventService.getAvailableEvents()
        
        return res.status(200).json(events)
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }   
}

export const getMyEventsHandler = async (req: AuthRequest, res: Response) => {
    try {
        const events = await eventService.getMyEvents(req.user!.id)

        return res.status(200).json(events)
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

export const getEventByIdHandler = async (req: AuthRequest, res: Response) => {
    try {
        const event = await eventService.getEventById(req.params.id as string)

        if (!event) {
            return res.status(404).json({ error: 'Event not found' })
        }

        return res.status(200).json(event)

    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}