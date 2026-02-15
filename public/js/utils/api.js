const API_URL = '/api'

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
        console.log(errorData)
        throw new Error(errorData.error || 'An error occurred')
    }

    return response.json()
}