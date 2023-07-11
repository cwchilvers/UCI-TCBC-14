module.exports = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/'); // Redirect user to home page
        } else {
            alert('Log in failed.');        // Alert user that log in failed
        }
    }
};

document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);