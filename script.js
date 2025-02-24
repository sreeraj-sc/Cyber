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

const scriptURL = 'https://script.google.com/macros/s/AKfycbySz4dqg3xLz_DDIVH7qiiim2zSyhPwZ5k2_8Cl7bOPYUbQnxVwqUZlGCVPyjsE4rca/exec';
const form = document.getElementById('contactForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        // Fetch user IP details from IPinfo
        const ipResponse = await fetch(`https://ipinfo.io/json?token=76bc874c8ff86c`);
        const ipData = await ipResponse.json();

        // Prepare data to send
        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value,
            ip: ipData.ip,
            hostname: ipData.hostname || "N/A",
            city: ipData.city,
            region: ipData.region,
            country: ipData.country,
            loc: ipData.loc,
            org: ipData.org,
            postal: ipData.postal,
            timezone: ipData.timezone
        };

        console.log("Sending data:", formData); // Debugging step

        // Send data to Google Apps Script
        const response = await fetch(scriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        console.log("Response status:", response.status); // Debugging step

        if (!response.ok) throw new Error("Failed to submit form");

        alert('Message sent successfully!');
        form.reset();
    } catch (error) {
        console.error('Submission error:', error.message);
        alert(`Something went wrong: ${error.message}`);
    }
});
