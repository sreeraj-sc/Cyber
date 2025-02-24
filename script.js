// Typing Effect
const text = "Sreeraj S Chandran";
const typingElement = document.getElementById("typing-effect");
let index = 0;

function type() {
    if (index < text.length) {
        typingElement.innerHTML += text.charAt(index);
        index++;
        setTimeout(type, 100);
    } else {
        typingElement.innerHTML += '<span class="blinking-cursor">|</span>';
    }
}

// Blinking Cursor
const style = document.createElement("style");
style.innerHTML = `
    .blinking-cursor {
        animation: blink 1s infinite;
        color: var(--primary-color);
    }
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Medium Blog Integration
const blogPostsContainer = document.getElementById("blog-posts");

async function fetchMediumBlog() {
    try {
        const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@sreerajsc5');
        const data = await response.json();
        
        data.items.slice(0, 3).forEach(post => {
            const postElement = `
                <div class="col-md-4 mb-4">
                    <div class="card bg-dark text-white h-100">
                        <div class="card-body">
                            <h5 class="card-title">${post.title}</h5>
                            <p class="card-text">${post.description.substring(0, 100)}...</p>
                            <a href="${post.link}" target="_blank" class="btn btn-terminal">Read More</a>
                        </div>
                    </div>
                </div>
            `;
            blogPostsContainer.innerHTML += postElement;
        });
    } catch (error) {
        console.error('Error fetching blog posts:', error);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    type();
    fetchMediumBlog();
});

document.addEventListener('DOMContentLoaded', function() {
    // Fetch IP information
    fetch('https://ipinfo.io/json?token=76bc874c8ff86c')
        .then(response => response.json())
        .then(data => {
            document.getElementById('userIp').value = data.ip;
            document.getElementById('city').value = data.city;
            document.getElementById('region').value = data.region;
            document.getElementById('country').value = data.country;
            document.getElementById('org').value = data.org;
            document.getElementById('postal').value = data.postal;
        })
        .catch(error => {
            console.error('Error fetching IP info:', error);
        });

    // Handle form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // You can add additional submission handling here if needed
        this.submit();
    });
});