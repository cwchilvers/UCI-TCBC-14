const updatePostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    // Get the post ID from the data attribute
    const postId = event.target.closest('#post-form').dataset.value;

    const response = await fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/'); // Redirect user to home page
    } else {
        alert('Failed to update post.');
    }
};

document
    .querySelector('#post-form')
    .addEventListener('submit', updatePostHandler);