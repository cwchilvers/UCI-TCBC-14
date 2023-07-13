const newCommentHandler = async (event) => {
    event.preventDefault();

    const content = document.querySelector('#content').value.trim();
    const post_id = document.querySelector('#post-id').value;

    console.log(content, post_id);

    const response = await fetch('/api/posts/${postId}', {
        method: 'POST',
        body: JSON.stringify({ post_id, content }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
        alert('Failed to submit new comment.');
    } 

    document.location.replace('/' + post_id); // Refresh page
};

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newCommentHandler);