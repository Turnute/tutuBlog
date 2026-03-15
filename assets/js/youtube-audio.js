(() => {
  let apiPromise = null;
  let player = null;
  let playerReady = false;
  let currentVideoId = null;
  let currentTrigger = null;

  function extractYouTubeVideoId(input) {
    if (!input) return null;

    // ID direct
    if (/^[a-zA-Z0-9_-]{11}$/.test(input)) {
      return input;
    }

    try {
      const url = new URL(input);

      // youtube.com/watch?v=...
      if (url.hostname.includes("youtube.com")) {
        const v = url.searchParams.get("v");
        if (v) return v;

        // youtube.com/embed/...
        const embedMatch = url.pathname.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
        if (embedMatch) return embedMatch[1];

        // youtube.com/shorts/...
        const shortsMatch = url.pathname.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
        if (shortsMatch) return shortsMatch[1];
      }

      // youtu.be/...
      if (url.hostname.includes("youtu.be")) {
        const shortId = url.pathname.slice(1);
        if (/^[a-zA-Z0-9_-]{11}$/.test(shortId)) return shortId;
      }
    } catch (e) {
      return null;
    }

    return null;
  }

  function ensureHiddenPlayerContainer() {
    if (document.getElementById("yt-audio-player")) return;

    const container = document.createElement("div");
    container.id = "yt-audio-player";
    container.style.position = "fixed";
    container.style.left = "-9999px";
    container.style.top = "-9999px";
    container.style.width = "1px";
    container.style.height = "1px";
    container.style.opacity = "0";
    container.style.pointerEvents = "none";
    document.body.appendChild(container);
  }

  function updateTriggerStates(activeTrigger = null, isPlaying = false) {
    document.querySelectorAll(".yt-audio-trigger").forEach(el => {
      el.classList.remove("is-playing", "is-paused");
      el.setAttribute("aria-pressed", "false");
    });

    if (activeTrigger) {
      activeTrigger.classList.add(isPlaying ? "is-playing" : "is-paused");
      activeTrigger.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    }
  }

  function loadYouTubeAPI() {
    if (window.YT && window.YT.Player) {
      return Promise.resolve(window.YT);
    }

    if (apiPromise) {
      return apiPromise;
    }

    apiPromise = new Promise((resolve) => {
      const previous = window.onYouTubeIframeAPIReady;

      window.onYouTubeIframeAPIReady = function () {
        if (typeof previous === "function") previous();
        resolve(window.YT);
      };

      if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
        const tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    });

    return apiPromise;
  }

  function getFirstValidVideoId() {
    const triggers = document.querySelectorAll(".yt-audio-trigger");

    for (const trigger of triggers) {
      const rawValue = trigger.dataset.youtube || trigger.dataset.audioSrc;
      const videoId = extractYouTubeVideoId(rawValue);
      if (videoId) return videoId;
    }

    return null;
  }

  function ensurePlayer(initialVideoId = null) {
    if (player && playerReady) {
      return Promise.resolve(player);
    }

    return loadYouTubeAPI().then(() => {
      if (player && playerReady) {
        return player;
      }

      ensureHiddenPlayerContainer();

      return new Promise((resolve) => {
        player = new YT.Player("yt-audio-player", {
          height: "1",
          width: "1",
          videoId: initialVideoId || undefined,
          playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
            playsinline: 1
          },
          events: {
            onReady: () => {
              playerReady = true;
              player.setVolume(50);
              resolve(player);
            },
            onStateChange: (event) => {
              if (event.data === YT.PlayerState.PLAYING) {
                updateTriggerStates(currentTrigger, true);
              } else if (
                event.data === YT.PlayerState.PAUSED ||
                event.data === YT.PlayerState.ENDED
              ) {
                updateTriggerStates(currentTrigger, false);
              }
            }
          }
        });
      });
    });
  }

  async function handleTriggerClick(triggerEl) {
    const rawValue = triggerEl.dataset.youtube || triggerEl.dataset.audioSrc;
    const videoId = extractYouTubeVideoId(rawValue);

    if (!videoId) {
      console.warn("Lien YouTube invalide :", rawValue);
      return;
    }

    try {
      await ensurePlayer(videoId);

      const sameVideo = currentVideoId === videoId;

      if (sameVideo) {
        const state = player.getPlayerState();

        if (state === YT.PlayerState.PLAYING) {
          player.pauseVideo();
          updateTriggerStates(triggerEl, false);
        } else {
          player.playVideo();
          currentTrigger = triggerEl;
          updateTriggerStates(triggerEl, true);
        }
        return;
      }

      currentVideoId = videoId;
      currentTrigger = triggerEl;

      player.loadVideoById(videoId);
      player.playVideo();
      updateTriggerStates(triggerEl, true);
    } catch (error) {
      console.error("Impossible d'initialiser le player YouTube :", error);
    }
  }

  function initYouTubeAudioTriggers() {
    // Précharge l’API dès le chargement de la page
    loadYouTubeAPI().then(() => {
      const firstVideoId = getFirstValidVideoId();
      if (firstVideoId) {
        ensurePlayer(firstVideoId);
      }
    });

    document.addEventListener("click", (event) => {
      const trigger = event.target.closest(".yt-audio-trigger");
      if (!trigger) return;

      handleTriggerClick(trigger);
    });

    document.addEventListener("keydown", (event) => {
      const trigger = event.target.closest(".yt-audio-trigger");
      if (!trigger) return;

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleTriggerClick(trigger);
      }
    });
  }

  document.addEventListener("DOMContentLoaded", initYouTubeAudioTriggers);
})();