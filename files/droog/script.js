async function sha256(text) {

const data = new TextEncoder().encode(text);

const hashBuffer = await crypto.subtle.digest("SHA-256", data);

const hashArray = Array.from(new Uint8Array(hashBuffer));

return hashArray.map(b =>
b.toString(16).padStart(2, "0")
).join("");

}

document.addEventListener("DOMContentLoaded", async () => {

const stored = localStorage.getItem("ae_auth");

const correct = await sha256("question");

if (stored === correct) {

document.body.classList.add("admin-unlocked");

const panel =
document.querySelector(".secret-panel");

const toggle =
document.querySelector(".secret-toggle");

toggle.addEventListener("click", () => {

panel.classList.toggle("open");

});

const response =
await fetch("restricted.txt");

const text =
await response.text();

document.getElementById("secret-content")
.innerHTML = `
<h2>RESTRICTED FILE</h2>
<pre>${text}</pre>
`;

}

});
