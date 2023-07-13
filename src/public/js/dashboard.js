const deletePostHandler = async (event) => {
    event.preventDefault();

    // Check if the clicked element's <img> parent (<a>) is the delete button
    if (event.target.parentElement.matches('.delete-button')) {
        // Get the post ID from the data attribute
        const postId = event.target.closest('.item').dataset.value;

        try {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove the deleted item from the dashboard
                event.target.closest('.item').remove();
            } else {
                // Display an error message
                alert('Failed to delete post.');
            }
        } catch (error) {
            console.log(error);
            // Display an error message
            alert('An error occurred while deleting the post.');
        }
    }
};

const editPostHandler = async (event) => {
    event.preventDefault();

    // Check if the clicked element's <img> parent (<a>) is the edit button
    if (event.target.parentElement.matches('.edit-button')) {
        // Get the post ID from the data attribute
        const postId = event.target.closest('.item').dataset.value;

        // Go to the edit post page
        document.location.replace(`/post/${postId}/edit`);
    }
};

// Attach the event listener to the #dashboard-container using event delegation
document.querySelector('#dashboard-container').addEventListener('click', deletePostHandler);
document.querySelector('#dashboard-container').addEventListener('click', editPostHandler);
