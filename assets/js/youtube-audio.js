(() => {
  let apiReady = false;
  let apiLoading = false;
  let player = null;
  let playerReady = false;
  let currentVideoId = null;
  let currentTrigger = null;
  let pendingVideoId = null;
  let pendingTrigger = null;

  function extractYouTubeVideoId(input) {
    if (!input) return null;

    // Si on donne directement un ID
    const directIdMatch = input.match(/^[a-zA-Z0-9_-]{11}$/);
    if (directIdMatch) return input;

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
        if (shortId) return shortId;
      }
    } catch (e) {
      return null;
    }

    return null;
  }

  function loadYouTubeAPI() {
    if (apiReady || apiLoading) return;
    apiLoading = true;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
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
      el.classList.remove("is-playing");
      el.classList.remove("is-paused");
      el.setAttribute("aria-pressed", "false");
    });

    if (activeTrigger) {
      activeTrigger.classList.add(isPlaying ? "is-playing" : "is-paused");
      activeTrigger.setAttribute("aria-pressed", isPlaying ? "true" : "false");
    }
  }

  function createPlayer(videoId) {
    ensureHiddenPlayerContainer();

    player = new YT.Player("yt-audio-player", {
      height: "1",
      width: "1",
      videoId,
      playerVars: {
        autoplay: 1,
        controls: 0,
        modestbranding: 1,
        rel: 0
      },
      events: {
        onReady: () => {
          playerReady = true;

          if (pendingVideoId) {
            const vid = pendingVideoId;
            const trig = pendingTrigger;
            pendingVideoId = null;
            pendingTrigger = null;
            playVideo(vid, trig);
          }
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
  }

  function playVideo(videoId, triggerEl) {
    if (!apiReady) {
      pendingVideoId = videoId;
      pendingTrigger = triggerEl;
      loadYouTubeAPI();
      return;
    }

    if (!player) {
      pendingVideoId = videoId;
      pendingTrigger = triggerEl;
      createPlayer(videoId);
      return;
    }

    if (!playerReady) {
      pendingVideoId = videoId;
      pendingTrigger = triggerEl;
      return;
    }

    if (currentVideoId === videoId) {
      const state = player.getPlayerState();

      if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        updateTriggerStates(triggerEl, false);
      } else {
        player.playVideo();
        updateTriggerStates(triggerEl, true);
      }
      return;
    }

    currentVideoId = videoId;
    currentTrigger = triggerEl;

    player.loadVideoById(videoId);
    player.playVideo();
    updateTriggerStates(triggerEl, true);
  }

  function handleTriggerClick(triggerEl) {
    const rawValue = triggerEl.dataset.youtube;
    const videoId = extractYouTubeVideoId(rawValue);

    if (!videoId) {
      console.warn("Lien YouTube invalide :", rawValue);
      return;
    }

    currentVideoId = videoId;
    currentTrigger = triggerEl;
    playVideo(videoId, triggerEl);
  }

  function initYouTubeAudioTriggers() {
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

  window.onYouTubeIframeAPIReady = function () {
    apiReady = true;
  };

  document.addEventListener("DOMContentLoaded", initYouTubeAudioTriggers);
})();