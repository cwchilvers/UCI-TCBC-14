const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-sign-up').value.trim();
    const password = document.querySelector('#password-sign-up').value.trim();

    if (username && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/'); // Redirect user to home page
        } else {
            alert('Failed to sign up.');    // Alert user that sign-up failed
        }
    }
};

document
    .querySelector('.sign-up-form')
    .addEventListener('submit', signupFormHandler);