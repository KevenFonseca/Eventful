import { RegistrationModel } from "../modules/registrations/registration.model.js"
import { EventModel } from "../modules/events/event.model.js"
import { UserModel } from "../modules/users/user.model.js"
import { sendReminderEmail } from './mailer.js'

export const checkEvents = async () => {
    const now = new Date()

    const registration = await RegistrationModel.find({})
        .populate({ path: 'event', match: { date: { $gte: now }}})
        .populate('participant')

    for (const reg of registration) {
        if (!reg.event) continue

        const event = reg.event as any
        const participant = reg.participant as any

        const eventDate = new Date(event.date)

        const emailPromises: Promise<any>[] = []

        for (const hoursBefore of reg.reminderHours) {
            const sendTime = new Date(eventDate.getTime() - hoursBefore * 60 * 60 * 1000)

            if (!reg.remindersSent.includes(hoursBefore) && now >= sendTime) {
                emailPromises.push(
                    sendReminderEmail(
                        participant.email,
                        event.title,
                        eventDate,
                        hoursBefore
                    )
                )
                reg.remindersSent.push(hoursBefore)
            }
        }

        if (emailPromises.length > 0) {
            await Promise.all(emailPromises)
            await reg.save()
        }
    }
}