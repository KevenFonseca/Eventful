import { Schema, model, Document, Types } from "mongoose"

export interface IRegistration extends Document {
    participant: Types.ObjectId
    event: Types.ObjectId
    registeredAt: Date
    code: string
    isUsed: boolean
}

const RegistrationSchema = new Schema<IRegistration>(
    {
        participant: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        event: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: true
        },
        code: {
            type: String,
            unique: true,
            required: true
        },
        isUsed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

// Prevents duplicate registrations: 1 user per event
RegistrationSchema.index({ participant: 1, event: 1}, { unique: true })

export const RegistrationModel = model<IRegistration>('Registration', RegistrationSchema)