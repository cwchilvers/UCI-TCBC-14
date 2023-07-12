const newPostHandler = async (event) => {


    console.log("FUCKING PRINT THIS YOU PIECE OF SHIT! #01");
    


    event.preventDefault();



    console.log("FUCKING PRINT THIS YOU PIECE OF SHIT! #02");




    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const user_id = document.querySelector('#user-id').value;




    console.log("FUCKING PRINT THIS YOU PIECE OF SHIT! #03");




    const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content, user_id }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/'); // Redirect user to home page
    } else {
        alert('Failed to submit new post.');
    }
};

document
    .querySelector('.new-post-form')
    .addEventListener('submit', newPostHandler);