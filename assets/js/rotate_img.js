const img = document.getElementById("pfp");

if (img) {
    img.addEventListener("click", () => {
        img.classList.toggle("spin");
    });
}
