import { fetchData } from './api.js'

// login
export async function login(email, password) {
    try {
        const data = await fetchData('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        })

        localStorage.setItem('token', data.token)
        localStorage.setItem('userName', data.name)
        localStorage.setItem('role', data.role)

        alert('Login successful!')

        window.location.href = '/index.html'

    } catch (error) {
        alert(error.message)
    }
}

// register
export async function signup(name, email, password, role) {
    try {
        const data = await fetchData('/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ name, email, password, role })
        })

        localStorage.setItem('token', data.token)
        localStorage.setItem('userName', data.name)
        localStorage.setItem('role', data.role)

        alert('Signup successful!')

        window.location.href = '/auth.html?mode=login'
    
    } catch (error) {
        alert(error.message)
    }
}