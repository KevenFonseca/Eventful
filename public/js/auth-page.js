import { login, signup } from './auth.js'

// DOM elements
const loginTab = document.getElementById('login-tab')
const signupTab = document.getElementById('signup-tab')
const nameField = document.getElementById('name-field')
const roleField = document.getElementById('role-field')
const submitButton = document.getElementById('submit-button')
const form = document.getElementById('auth-form')

let mode = 'signup'

// EVENTS
loginTab.addEventListener('click', () => switchMode('login'))
signupTab.addEventListener('click', () => switchMode('signup'))

form.addEventListener('submit', async (event) => {
    event.preventDefault()

    // collect form data
    const email = form.email.value.trim()
    const password = form.password.value.trim()

    if (!email || !password) {
        alert('Please enter all fields')
        return
    }

    try {
        if (mode === 'login') {
            await login(email, password)
        } else {
            const name = form.name.value.trim()
            const role = form.role.value

            if (!name || !role) {
                alert('Fill in all registration fields')
                return
            }

            await signup(name, email, password, role)
        }
        
    } catch (error) {
        alert(error.message || 'An error occurred')
    }
})

// FUNCTIONS
function switchMode(newMode) {
    mode = newMode
    
    if (mode === 'login') {
        loginTab.classList.add('active')
        signupTab.classList.remove('active')
        nameField.style.display = 'none'
        roleField.style.display = 'none'
        submitButton.textContent = 'Log In'
    } else {
        signupTab.classList.add('active')
        loginTab.classList.remove('active')
        nameField.style.display = 'block'
        roleField.style.display = 'block'
        submitButton.textContent = 'Sign Up'
    }
}

// INIT
const params = new URLSearchParams(window.location.search)
const initialMode = params.get('mode') === 'signup' ? 'signup' : 'login'

switchMode(initialMode)