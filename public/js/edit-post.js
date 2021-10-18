async function editFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="title"]').value.trim();
    const description = document.querySelector('input[name="description"]').value.trim();
    console.log(title);
    console.log(description);

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1

    ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title,
            description
        }),

        headers: {
            'Content-Type': 'application/json'
        }
    });


    if (response.ok) {
        document.location.replace('/profile/');
    } else {
        alert(response.statusText);
    }

}

document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);