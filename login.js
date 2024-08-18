// Store valid credentials in localStorage (This would normally be done once, not every time the script runs)
localStorage.setItem('validUsername', 'admin');
localStorage.setItem('validPassword', 'admin123');

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Get valid credentials from localStorage
    const validUsername = localStorage.getItem('validUsername');
    const validPassword = localStorage.getItem('validPassword');

    // Check username and password
    if (username === validUsername && password === validPassword) {
        // Save login state in localStorage
        localStorage.setItem('isLoggedIn', 'true');

        // Redirect to resume page
        window.location.href = 'Resume.html';
    } else {
        // Show error message if credentials are invalid
        document.getElementById('error-msg').textContent = 'Invalid username/password';
    }
}

//  handle page redirection and prevent back navigation
function handlePageRedirection() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const isLoginPage = window.location.pathname.endsWith('Login.html');
    const isResumePage = window.location.pathname.endsWith('Resume.html');

    if (isLoggedIn && isLoginPage) {
        window.location.href = 'Resume.html';
    } else if (!isLoggedIn && isResumePage) {
        window.location.href = 'Login.html';
    } else if (isLoggedIn && isResumePage) {
        window.history.replaceState(null, '', window.location.href);
        window.onpopstate = () => window.location.href = 'Resume.html';
    }
}

//   page load
window.onload = handlePageRedirection;