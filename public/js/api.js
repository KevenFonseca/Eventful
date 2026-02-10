const API_URL = 'http://localhost:/3000/api'

export async function fetchData(endpoint, options = {}) {
    const token = localStorage.getItem("token")

    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers
    })

    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'An error occurred')
    }

    return response.json()
}