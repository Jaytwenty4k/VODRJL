const CLIENT_ID = "1345009931509563443";
const REDIRECT_URI = "https://jaytwenty4k.github.io/DanoneCraft/";

// Discord Login URL erstellen
function loginWithDiscord() {
    const authUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=token&scope=identify`;
    window.location.href = authUrl;
}

// Discord-Nutzerdaten holen
function getUserData(accessToken) {
    fetch("https://discord.com/api/users/@me", {
        headers: { "Authorization": `Bearer ${accessToken}` }
    })
    .then(response => response.json())
    .then(user => {
        // Anzeigename und Avatar aktualisieren
        const username = user.global_name || user.username;
        const avatarUrl = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`;

        document.getElementById("username").textContent = username;
        document.getElementById("username-large").textContent = username;
        document.getElementById("avatar").src = avatarUrl;
        document.getElementById("avatar-large").src = avatarUrl;
    })
    .catch(error => console.error("Fehler beim Abrufen der Nutzerdaten:", error));
}

// Token prüfen und Userdaten holen
function checkForToken() {
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
        const params = new URLSearchParams(hash.substring(1));
        const accessToken = params.get("access_token");
        getUserData(accessToken);
    }
}

// Menü ein- und ausblenden
const sidebar = document.getElementById("sidebar");
const menuBtn = document.getElementById("menu-btn");
const closeBtn = document.getElementById("close-btn");

menuBtn.onclick = () => sidebar.style.left = "0";
closeBtn.onclick = () => sidebar.style.left = "-250px";

window.onload = checkForToken;
