import { fetchData } from './api.js'
import { requireAuth } from './require-auth.js'

requireAuth('participant')

async function loadMyEvents() {
    try {
        const events = await fetchData('/events/my-events')
        const container = document.getElementById('my-events')

        if (events.length === 0) {
            container.innerHTML = '<p>You have no events.</p>'
            return
        }

        container.innerHTML = events.map(event => `
            <div class="card">
                <span class="card-tag">${event.category}</span>
                <h3 class="card-title">${event.title}</h3>
                <div class="card-info">
                    <p class="card-location">📍 ${event.location}</p>
                    <p class="card-date">📅 ${new Date(event.date).toLocaleDateString('pt-PT', {timeZone: 'UTC'})}</p>
                </div>
                <a href="event.html?id=${event._id}" class="card-button">View Details</a>
            </div>
        `).join('')

    } catch (error) {
        alert(error.message)
    }
}

// loadMyEvents()