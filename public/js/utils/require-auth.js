export function requireAuth(role = null) {
    const token = localStorage.getItem('token')
    const userRole = localStorage.getItem('role')

    // not logged in
    if (!token) {
        window.location.href = 'auth.html?mode=login'
        return
    }

    if (role && userRole !== role) {
        alert('You do not have permission to access this page.')
        window.location.href = 'index.html'
        return
    }
}   