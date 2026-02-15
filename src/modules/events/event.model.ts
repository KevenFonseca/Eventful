import { Schema, model, Document, Types } from "mongoose"

export interface IEvent extends Document {
    title: string
    description: string
    category: string
    date: Date
    location: string
    price: number
    totalTickets: number
    availableTickets: number
    reminderHours: number[]
    creator: Types.ObjectId
}

const EventSchema = new Schema<IEvent>(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String
        },
        category: {
            type: String
        },
        date: {
            type: Date,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        totalTickets: {
            type: Number,
            required: true,
            min: 1
        },
        availableTickets: {
            type: Number,
            required: true,
        },
        reminderHours: {
            type: [Number],
            default: [],
            required: false
        },
        creator: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
)

export const EventModel = model<IEvent>('Event', EventSchema)
