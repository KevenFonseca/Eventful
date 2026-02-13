import { fetchData } from "./api.js"
import { requireAuth } from "./require-auth.js"

requireAuth('creator')

const form = document.getElementById('create-event-form')
const categorySelect = document.getElementById('category')
const customCategoryContainer = document.getElementById('custom-category-container')
const customCategoryInput = document.getElementById('custom-category')

if (!form || !categorySelect || !customCategoryContainer || !customCategoryInput) {
  throw new Error('Form elements not found')
}

categorySelect.addEventListener('change', () => {
    if (categorySelect.value === 'Other') {
        customCategoryContainer.style.display = 'block'
        customCategoryInput.required = true
    } else {
        customCategoryContainer.style.display = 'none'
        customCategoryInput.required = false
        customCategoryInput.value = ''
    }
})

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const category = categorySelect.value === 'Other' ? customCategoryInput.value.trim() : categorySelect.value
    const eventData = {
        title: document.getElementById('title').value.trim(),
        description: document.getElementById('description').value.trim(),
        category,
        date: new Date(document.getElementById('date').value),
        location: document.getElementById('location').value.trim(),
        price: parseFloat(document.getElementById('price').value) || 0,
        totalTickets: parseInt(document.getElementById('totalTickets').value)
    }

    try {
        await fetchData('/events', {
            method: 'POST',
            body: JSON.stringify(eventData)
        })

        alert('Event created successfully!')
        form.reset()
        customCategoryContainer.style.display = 'none'

        window.location.href = 'my-events.html'
    } catch (error) {
        alert(error.message)
    }
})