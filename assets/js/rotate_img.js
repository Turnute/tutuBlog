const img = document.getElementById("pfp");

img.addEventListener("click", () => {
    if (img.classList.contains("spin")) {
        img.classList.remove("spin");
        return;
    }
    else {
        img.classList.add("spin");
    }
});