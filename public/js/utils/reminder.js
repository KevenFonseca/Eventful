export async function setReminder(registrationId) {
    const input = document.getElementById(`reminder-${registrationId}`).value
    const reminderHours = input.split(',').map(h => parseInt(h.trim())).filter(h => Number.isInteger(h) && h > 0)

    if (reminderHours.length === 0) {
        alert('Please enter valid numbers')
        return
    }
    
    try {
        console.log("Sending:",  JSON.stringify({ reminderHours }) )
        console.log(`/registrations/${registrationId}/reminders`)
        
        await fetchData(`/registrations/${registrationId}/reminders`, {
            method: 'PUT',
            body: JSON.stringify({ reminderHours })
        })

        alert('Reminders saved successfully')
    } catch (error) {
        alert('Failed to save reminders')
    }
}