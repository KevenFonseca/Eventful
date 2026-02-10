function getIniciais(name) {
    return name.split(' ').map(n => n[0].toUpperCase()).join('')
}

function logout() {
    localStorage.clear()
    window.location.href = 'index.html'
}

function setupUserUI() {
    const userArea = document.getElementById('user-area')
    if (!userArea) return

    const token = localStorage.getItem('token')
    const userName = localStorage.getItem('userName')
    const role = localStorage.getItem('role')

    if (!token || !userName) {
        userArea.innerHTML = `<a href="auth.html?mode=signup">Sign Up</a>
                            <a href="auth.html?mode=login" class="btn btn-primary">Log In</a>`
        return
    }

    let dashboardLink = ''
    if (role === 'creator') {
        dashboardLink = '<a href="/my-events.html" class="btn btn-primary">Dashboard</a>'
    }

  
    const initials = getIniciais(userName)
    userArea.innerHTML = `
        ${dashboardLink}
        <span class="user-initials" title="${userName}">${initials}</span>
        <button class="logout-button" onclick="logout()">Logout</button>
        `
}

setupUserUI()