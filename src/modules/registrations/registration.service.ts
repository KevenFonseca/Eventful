import { Types } from 'mongoose'
import { EventModel } from '../events/event.model.js'
import { RegistrationModel } from './registration.model.js'
import { v4 as uuidv4 } from 'uuid'

export const createRegistration = async (participantId: string, eventId: string) => {
    if (!Types.ObjectId.isValid(eventId)) throw new Error('Invalid eventId')

    const event = await EventModel.findById(eventId)
    if (!event) throw new Error('Event not found')

    if (event.availableTickets <= 0) throw new Error('No tickets available')

    const existing = await RegistrationModel.findOne({
        participant: participantId,
        event: event._id
    })

    if (existing) throw new Error('Already registered for this event')

    // create registration
    const session = await RegistrationModel.startSession()
    session.startTransaction()

    try {
        const registration = await RegistrationModel.create(
            [{
                participant: participantId,
                event: event._id,
                code: uuidv4()
            }], 
            { session }
        )

        event.availableTickets -= 1

        await event.save({ session })

        await session.commitTransaction()
        session.endSession()

        return registration[0]

    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        throw error
    }
}

export const getEventParticipants = async (eventId: string, creatorId: string) => {
    if (!Types.ObjectId.isValid(eventId)) throw new Error('Invalid eventId')

    const event = await EventModel.findById(eventId)
    if (!event) throw new Error('Event not found')
    
    if (event.creator.toString() !== creatorId) throw new Error('Unauthorized')

    const registrations = await RegistrationModel.find({ event: event._id })
        .populate('participant', 'name email')
        .sort({ registeredAt: 1 })

    return registrations.map(reg => reg.participant)
}

export const getMyRegistrations = async (participantId: string) => {
    return RegistrationModel.find({participant: participantId})
        .populate('event', 'title date location')
        .select('-code -participant -createdAt -updatedAt -__v')
        .sort({ createdAt: -1})
}

export const getRegistrationById = async (registrationId: string, participantId: string) => {
    if (!Types.ObjectId.isValid(registrationId)) throw new Error('Invalid registrationId')

    const registration = await RegistrationModel.findById(registrationId)
        .populate('event', 'title date location')
        .select('-createdAt -updatedAt -__v')

    if (!registration) throw new Error('Registration not found')

    if (registration.participant.toString() !== participantId) throw new Error('Unauthorized')

    return registration
}