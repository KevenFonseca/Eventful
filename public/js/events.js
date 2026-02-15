import { fetchData } from './utils/api.js'

// list events
async function loadEvents() {
    try {
        const events = await fetchData('/events')
        const container = document.getElementById('events')
        // const token = localStorage.getItem('token')

        if (events.length === 0) {
            container.innerHTML = '<p>No events yet.</p>'
            return
        }

        container.innerHTML = events.map(event => `
            <div class="card">
                <span class="card-tag">${event.category}</span>
                <h3 class="card-title">${event.title}</h3>
                <div class="card-info">
                    <p class="card-location">📍 ${event.location}</p>
                    <p class="card-date">📅 ${new Date(event.date).toLocaleDateString()}</p>
                </div>
                
                <button onclick="goToEventDetails('${event._id}')" class="card-button">View Details</button>
            </div>
        `).join('')

    } catch (error) {
        alert(error.message)
    }
}

window.goToEventDetails = function(eventId) {
    const token = localStorage.getItem('token')

    if (!token) {
        // save event for redirect after login
        localStorage.setItem('redirectAfterLogin', `/event-details.html?id=${eventId}`)
        window.location.href = 'auth.html?mode=login'
        return
    }

    // user is logged in, go to event details
    window.location.href = `/event-details.html?id=${eventId}`
}


loadEvents()