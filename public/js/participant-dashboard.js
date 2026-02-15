import { fetchData } from './utils/api.js'
import { requireAuth } from './utils/require-auth.js'
import { shareEvent } from './utils/share.js'
import { setReminder } from './utils/reminder.js'

requireAuth('participant')

async function loadMyRegistrations() {
    try {
        const registration = await fetchData('/registrations/my')
        const container = document.getElementById('registrations-container')

        if (registration.length === 0) {
            container.innerHTML = '<p>You have no registered events.</p>'
            return
        }

        container.innerHTML = registration.map(reg => `
            <div class="card">
                <h3 class="card-title">${reg.event.title}</h3>
                <div class="card-info">
                    <p class="card-location">📍 ${reg.event.location}</p>
                    <p class="card-date">📅 ${new Date(reg.event.date).toLocaleDateString('pt-PT', {timeZone: 'UTC'})}</p>
                </div>
                <p><strong>Status:</strong> ${reg.isUsed ? 'Used' : 'Valid'}</p>

                <div class='card-button-container'>
                    <button class="card-button" onclick="viewTicket('${reg._id}')">🎫 View Ticket</button>
                    <button class="card-button" onclick="shareEvent('${reg.event._id}', '${reg.event.title}')">🔗 Share</button>
                </div>

                <div class="reminder-section">
                    <label for="reminder-${reg._id}">Set Reminders (hours before event, comma separated)</label>
                    <input type="text" id="reminder-${reg._id}" placeholder="24, 72, 128">
                    <button class="card-button" onclick="setReminder('${reg._id}')">💾 Save Reminder</button>
                </div>
            </div>
        `).join('')

    } catch (error) {
        console.error(error)
        alert('Failed to load registrations')
    }
}

window.viewTicket = function(id) {
    window.location.href = `ticket.html?id=${id}`
}

window.shareEvent = function(eventId) {
    window.location.href = 'share.html'
}

window.shareEvent = shareEvent

window.setReminder = setReminder

loadMyRegistrations()