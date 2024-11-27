document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    
    if (response.ok) {
        // Store the token in localStorage and redirect to restricted page
        localStorage.setItem('token', data.token);
        window.location.href = 'restricted.html';  // Redirect to a restricted area
    } else {
        document.getElementById('error-message').textContent = data.message || 'Login failed';
    }
});
