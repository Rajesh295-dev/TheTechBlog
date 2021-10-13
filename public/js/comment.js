const createComment = async (event) => {
    event.stopPropagation();

    const userid = document.querySelector(".user-profile").getAttribute("data-currentuser");
    console.log(userid);
    const postid = event.target.getAttribute("data-postid");
    console.log(postid);
    const content = document.querySelector(".input-comment").value;
    console.log(content);

    const response = await fetch(`/api/comments/${userid}/${postid}`, {
        method: "POST",
        body: JSON.stringify({ userid, postid, content }),
        headers: { "Content-Type": "application/json" }
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert("Failed to create comment.");
    }
};

document.querySelector(".new-comment").addEventListener("click", createComment);