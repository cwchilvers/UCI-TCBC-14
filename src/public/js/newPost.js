const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.replace(/\r?\n/g, '<br>').trim();

    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/'); // Redirect user to home page
    } else {
        alert('Failed to submit new post.');
    }
};

document
    .querySelector('#post-form')
    .addEventListener('submit', newPostHandler);