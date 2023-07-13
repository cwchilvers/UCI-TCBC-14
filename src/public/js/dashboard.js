// Delete post handler
const deletePostHandler = async (event) => {
    event.preventDefault();

    // Check if the clicked element or its parent is the delete button
    if (event.target.matches('.delete-button') || event.target.parentElement.matches('.delete-button')) {
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
                alert('Failed to delete the post.');
            }
        } catch (error) {
            console.log(error);
            // Display an error message
            alert('An error occurred while deleting the post.');
        }
    }
};

// Attach the event listener to the #dashboard-container using event delegation
document.querySelector('#dashboard-container').addEventListener('click', deletePostHandler);
