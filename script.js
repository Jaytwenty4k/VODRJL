const CLIENT_ID = "1345009931509563443"; 
const REDIRECT_URI = "https://jaytwenty4k.github.io/DanoneCraft/";

document.addEventListener("DOMContentLoaded", () => {
    checkForToken();
    setupEventListeners();
});

function loginWithDiscord() {
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=identify`;
    window.location.href = authUrl;
}

function getUserData(accessToken) {
    fetch("https://discord.com/api/users/@me", {
        headers: { "Authorization": `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(user => {
        document.getElementById("username").textContent = user.username;
        document.getElementById("avatar").src = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;
        // Zeige das Dashboard und verstecke die Login-Box
        document.getElementById("login-box").style.display = "none";
        document.getElementById("dashboard-content").style.display = "block";
    })
    .catch(error => console.error("Fehler beim Abrufen der Nutzerdaten:", error));
}

function checkForToken() {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        getUserData(accessToken);
    }
}

function toggleMenu() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.left === "0px") {
        sidebar.style.left = "-250px";
    } else {
        sidebar.style.left = "0px";
    }
}

function setupEventListeners() {
    const menuButton = document.querySelector(".menu-btn");
    const closeButton = document.querySelector(".close-btn");

    if (menuButton) menuButton.addEventListener("click", toggleMenu);
    if (closeButton) closeButton.addEventListener("click", toggleMenu);
}
