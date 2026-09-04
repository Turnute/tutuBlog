(() => {
    const games = window.GAMES_DATA || [];
    const tabs = document.getElementById("game-tabs");
    const detail = document.getElementById("game-detail");
    const mediaStage = document.getElementById("game-media-stage");
    const mediaCaption = document.getElementById("media-caption");
    const mediaPagination = document.getElementById("media-pagination");
    const mediaPrevious = document.getElementById("media-previous");
    const mediaNext = document.getElementById("media-next");
    const title = document.getElementById("game-title");
    const kicker = document.getElementById("game-kicker");
    const date = document.getElementById("game-date");
    const genre = document.getElementById("game-genre");
    const description = document.getElementById("game-description");
    const link = document.getElementById("game-link");
    const railPrevious = document.querySelector(".game-picker__scroll--previous");
    const railNext = document.querySelector(".game-picker__scroll--next");

    if (!games.length || !tabs || !detail) return;

    let selectedGameIndex = 0;
    let selectedMediaIndex = 0;
    let pointerStartX = null;

    const renderTabs = () => {
        tabs.innerHTML = games.map((game, index) => `
            <button
                id="game-tab-${game.id}"
                class="game-tab"
                type="button"
                role="tab"
                aria-selected="${index === 0}"
                aria-controls="game-detail"
                tabindex="${index === 0 ? "0" : "-1"}"
                data-game-index="${index}"
            >
                <span class="game-tab__image-wrap">
                    <img class="game-tab__image" src="${game.icon}" alt="" width="315" height="250" ${index > 4 ? 'loading="lazy"' : ""} decoding="async">
                </span>
                <span class="game-tab__title">${game.title}</span>
            </button>
        `).join("");
    };

    const renderMedia = () => {
        const game = games[selectedGameIndex];
        const media = game.media[selectedMediaIndex];
        const manySlides = game.media.length > 1;

        if (media.type === "youtube") {
            const videoId = encodeURIComponent(media.id);
            const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;
            const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&playsinline=1`;

            mediaStage.innerHTML = `
                <figure class="game-media__item">
                    <iframe
                        class="game-media__video"
                        src="${embedUrl}"
                        title="${media.title}"
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>

                    <a
                        class="game-media__video-fallback"
                        href="${watchUrl}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >Ouvrir sur YouTube ↗</a>
                </figure>
            `;
        } else {
            const cardClass = media.type === "card" ? " game-media__item--card" : "";
            mediaStage.innerHTML = `
                <figure class="game-media__item${cardClass}">
                    <img src="${media.src}" alt="${media.alt}" decoding="async">
                </figure>
            `;
        }

        mediaCaption.textContent = media.caption || "";
        mediaPrevious.hidden = !manySlides;
        mediaNext.hidden = !manySlides;

        mediaPagination.innerHTML = manySlides
            ? game.media.map((item, index) => `
                <button
                    class="game-media__dot"
                    type="button"
                    aria-label="Afficher l’illustration ${index + 1} sur ${game.media.length}"
                    aria-current="${index === selectedMediaIndex}"
                    data-media-index="${index}"
                ></button>
            `).join("")
            : "";
    };

    const selectMedia = (index) => {
        const count = games[selectedGameIndex].media.length;
        selectedMediaIndex = (index + count) % count;
        renderMedia();
    };

    const selectGame = (index, shouldFocus = false) => {
        selectedGameIndex = (index + games.length) % games.length;
        selectedMediaIndex = 0;
        const game = games[selectedGameIndex];
        const gameTabs = [...tabs.querySelectorAll(".game-tab")];

        detail.classList.add("is-changing");

        gameTabs.forEach((tab, tabIndex) => {
            const selected = tabIndex === selectedGameIndex;
            tab.setAttribute("aria-selected", String(selected));
            tab.tabIndex = selected ? 0 : -1;
            if (selected) {
                tab.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
                if (shouldFocus) tab.focus();
            }
        });

        kicker.textContent = game.status;
        title.textContent = game.title;
        date.textContent = game.date;
        date.dateTime = game.date;
        genre.textContent = game.genre;
        description.textContent = game.description;
        link.href = game.link;
        detail.setAttribute("aria-labelledby", `game-tab-${game.id}`);
        renderMedia();

        window.setTimeout(() => detail.classList.remove("is-changing"), 130);
    };

    renderTabs();

    tabs.addEventListener("click", (event) => {
        const tab = event.target.closest(".game-tab");
        if (!tab) return;
        selectGame(Number(tab.dataset.gameIndex));
    });

    tabs.addEventListener("keydown", (event) => {
        const currentTab = event.target.closest(".game-tab");
        if (!currentTab) return;

        const currentIndex = Number(currentTab.dataset.gameIndex);
        const targets = {
            ArrowLeft: currentIndex - 1,
            ArrowRight: currentIndex + 1,
            Home: 0,
            End: games.length - 1
        };

        if (targets[event.key] === undefined) return;
        event.preventDefault();
        selectGame(targets[event.key], true);
    });

    mediaPagination.addEventListener("click", (event) => {
        const dot = event.target.closest(".game-media__dot");
        if (!dot) return;
        selectMedia(Number(dot.dataset.mediaIndex));
    });

    mediaPrevious.addEventListener("click", () => selectMedia(selectedMediaIndex - 1));
    mediaNext.addEventListener("click", () => selectMedia(selectedMediaIndex + 1));
    railPrevious.addEventListener("click", () => tabs.scrollBy({ left: -420, behavior: "smooth" }));
    railNext.addEventListener("click", () => tabs.scrollBy({ left: 420, behavior: "smooth" }));

    mediaStage.addEventListener("pointerdown", (event) => {
        if (event.pointerType !== "mouse") pointerStartX = event.clientX;
    });

    mediaStage.addEventListener("pointerup", (event) => {
        if (pointerStartX === null) return;
        const distance = event.clientX - pointerStartX;
        pointerStartX = null;
        if (Math.abs(distance) < 45 || games[selectedGameIndex].media.length < 2) return;
        selectMedia(selectedMediaIndex + (distance < 0 ? 1 : -1));
    });

    selectGame(0);
})();
