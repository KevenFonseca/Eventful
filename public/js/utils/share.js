export async function shareEvent(eventId, title) {
    const url = `${window.location.origin}/event-details.html?id=${eventId}`

    try {
        if (navigator.share) {
            await navigator.share({
                title,
                text: `Join me at ${title} on Eventful`,
                url
            })
        } else {
            await navigator.clipboard.writeText(url)
            alert('Event link copied to clipboard!')
        }
    } catch (error) {
        console.error('Share failed', error)
    }
}