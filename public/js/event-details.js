import { fetchData } from "./utils/api.js"
import { shareEvent } from "./utils/share.js"

function getEventId() {
    const params = new URLSearchParams(window.location.search)
    return params.get('id')
}

async function loadEventDetails() {
    const eventId = getEventId()
    if (!eventId) {
        alert('Invalid  event')
        return
    }

    try {
        const event = await fetchData(`/events/${eventId}`)
        renderEvent(event)

        const role = localStorage.getItem('role')

        if (role === 'creator') {
            loadParticipants(eventId)
        }
    } catch (error) {
        alert(error.message)
    }
}

function renderEvent(event) {
    const container = document.getElementById('event-details')
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    container.innerHTML = `
            <div class="card">
                <span class="card-tag">${event.category}</span>
                <h3 class="card-title">Title: ${event.title}</h3>
                <p class="card-description">Description: ${event.description}</p>
                <div class="card-info">
                    <p class="card-location">Location: ${event.location}</p>
                    <p class="card-date">Date: ${new Date(event.date).toLocaleDateString()}</p>
                </div>
                <div class="card-footer">
                    <div class="card-tickets">Available tickets: ${event.availableTickets}</div>
                    <div class="card-price">${event.price > 0 ? `Price: ${event.price.toFixed(2)}€` : 'Free'}</div>
                </div>
                <div class="card-button-container">
                    ${
                        role !== 'creator'
                            ?   (token 
                                ? `<button class="card-button" id="register-btn")">Register</button>` 
                                : `<a href="login.html" class="card-button" id="login-btn">Log in to register</a>`
                                )
                            :   ''
                    }
                    <button class="card-button" onclick="shareEvent('${event._id}', '${event.title}')">🔗 Share </button>
                </div>
                <div id="participants"></div>
            </div>

        `

    if (token && role === 'participant') {
        document.getElementById('register-btn').addEventListener('click', () => registerEvent(event._id))
    }
}

async function registerEvent(eventId) {
    try {
        await fetchData(`/registrations/${eventId}/register`, {
            method: 'POST'
        })

        alert('Registration successful!')

        document.getElementById('register-btn').disabled = true

        loadEventDetails() // Refresh event details to update ticket count
    } catch (error) {
        alert(error.message)
    }
}

async function loadParticipants(eventId) {
    try {
        const participants = await fetchData(`/registrations/${eventId}/participants`)
        const container = document.getElementById('participants')

        container.innerHTML = `
            <div class="card-participants">
                <h3>Participants (${participants.length})</h3>
                ${
                    participants.length === 0
                        ? '<p>No participants yet.</p>'
                        : ` <ul>
                                ${participants.map(p => `<li>${p.name} (<span>${p.email}</span>)</li>`).join('')}
                            </ul>
                        `
                }
            </div>
        `
    } catch (error) {
        console.error(error)
        alert('Failed to load participants')
    }
}

window.shareEvent = shareEvent

loadEventDetails()