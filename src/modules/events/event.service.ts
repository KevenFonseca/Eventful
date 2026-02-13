import { Types } from "mongoose"
import { EventModel } from "./event.model.js"
import { CreateEventDTO } from "./dtos/create-event.dto.js"

export const createEvent = async (data: CreateEventDTO, creatorId: string) => {
    const event = await EventModel.create({
        ...data,
        availableTickets: data.totalTickets,
        creator: new Types.ObjectId(creatorId),
    })

    return event
}

export const getAvailableEvents = async () => {
    const now = new Date(Date.now())

    const query = {
        date: { $gt: now },
        availableTickets: { $gt: 0 }
    }

    return EventModel.find(query)
        .select('-availableTickets -createdAt -updatedAt -__v')
        .sort({ date: 1 })
        // .skip(0)
        // .limit(10)
}

export const getMyEvents = async (creatorId: string) => {
    return EventModel.find({ 
        creator: new Types.ObjectId(creatorId) 
    })
        .select('-availableTickets -creator -createdAt -updatedAt -__v')
        .sort({ date: 1 })
}

export const getEventById = async (eventId: string) => {
    if (!Types.ObjectId.isValid(eventId)) {
        return null
    }

    return EventModel.findById(eventId)
        .populate('creator', 'name email')
        .select('-__v')
}