document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");
    const loginForm = document.getElementById("login-form");
    const createPostForm = document.getElementById("create-post-form");
    const postsSection = document.getElementById("posts-section");
    const createPostSection = document.getElementById("create-post-section");
    const postsContainer = document.getElementById("posts-container");

    let loggedInUser = null;

    // Handle User Registration
    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("register-email").value;
        const password = document.getElementById("register-password").value;

        fetch("/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => alert(data.message))
            .catch((err) => console.error(err));
    });

    // Handle User Login
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        fetch("/auth/login", {
            method: "POST",
            headers: { "Authorization": `Basic ${btoa(`${email}:${password}`)}` },
        })
            .then((res) => {
                if (res.ok) {
                    loggedInUser = email;
                    createPostSection.style.display = "block";
                    postsSection.style.display = "block";
                    loadPosts();
                } else {
                    alert("Invalid email or password");
                }
            })
            .catch((err) => console.error(err));
    });

    // Handle Create Post
    createPostForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const content = document.getElementById("post-content").value;

        fetch("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${btoa(loggedInUser)}`,
            },
            body: JSON.stringify({ content }),
        })
            .then((res) => res.json())
            .then(() => {
                loadPosts();
                document.getElementById("post-content").value = "";
            })
            .catch((err) => console.error(err));
    });

    // Load Posts
    function loadPosts() {
        fetch("/posts")
            .then((res) => res.json())
            .then((posts) => {
                postsContainer.innerHTML = "";
                posts.forEach((post) => {
                    const postDiv = document.createElement("div");
                    postDiv.classList.add("post");
                    postDiv.innerHTML = `
                        <h3>Post by User ${post.userId}</h3>
                        <p>${post.content}</p>
                        <button onclick="likePost(${post.id})">Like (${post.likes.length})</button>
                    `;
                    postsContainer.appendChild(postDiv);
                });
            })
            .catch((err) => console.error(err));
    }

    // Like Post
    window.likePost = function (postId) {
        fetch(`/posts/${postId}/like`, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${btoa(loggedInUser)}`,
            },
        })
            .then(() => loadPosts())
            .catch((err) => console.error(err));
    };
});
