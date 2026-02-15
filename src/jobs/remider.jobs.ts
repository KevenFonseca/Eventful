import cron from 'node-cron'
import dotenv from 'dotenv'
import { checkEvents } from '../utils/check.events.js'

dotenv.config()

export const eventsReminder = () => {
    cron.schedule(
        '*/30 * * * *',
        async () => {
            console.log('Running reminder job')
            await checkEvents()    
        },
        {
            timezone: process.env.TZ || 'UTC'
        }
    )
}