import { fetchData } from "./utils/api.js"
import { requireAuth } from "./utils/require-auth.js"

requireAuth('participant')

function getRegistrationId() {
    const params = new URLSearchParams(window.location.search)
    return params.get('id')
}

async function loadTickets() {
    const registrationId = getRegistrationId()
    if (!registrationId) {
        // window.location.href = 'participant-dashboard.html'
        alert('Invalid register')
        return
    }

    try {
        const registration = await fetchData(`/registrations/${registrationId}`)
        const container = document.getElementById('ticket-details') 

        container.innerHTML = `
            <div class="card">
                <h3 class="card-title">${registration.event.title}</h3>
                <div class="card-info">
                    <p class="card-location">📍 ${registration.event.location}</p>
                    <p class="card-date">📅 ${new Date(registration.event.date).toLocaleDateString('pt-PT', {timeZone: 'UTC'})}</p>
                </div>
                <p><strong>Status:</strong> ${registration.isUsed ? 'Used' : 'Valid'}</p>
            </div>
        `

        const qrData = await fetchData(`/registrations/${registrationId}/qr`)

        const qrContainer = document.getElementById('qr-container')

        const img = document.createElement('img')
        img.src = qrData.qr
        img.alt = 'QR Code'
        img.style.width = '150px'

        qrContainer.appendChild(img)

    } catch (error) {
        alert('Failed to load ticket')
        window.location.href = 'participant-dashboard.html'
    }
}

loadTickets()