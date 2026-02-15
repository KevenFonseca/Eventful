import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

export const sendReminderEmail = async (to: string, eventTitle: string, eventDate: Date, hoursBefore: number) => {
    try {
        await transporter.sendMail({
            from: `"Eventful" <${process.env.EMAIL_USER}>`,
            to,
            subject: `Reminder: ${eventTitle} in ${hoursBefore} hours`,
            html: `
                <h2>Event Reminder</h2>
                <p>You event <strong>${eventTitle}</strong> is comming up in ${hoursBefore} hours.</p>
                <p>Date: ${eventDate.toDateString()} at ${eventDate.toLocaleTimeString()}</p>
            `
        })

        console.log('Email sent successfully')
    } catch (error) {
        console.error('Error sending email:', error)
    }
}