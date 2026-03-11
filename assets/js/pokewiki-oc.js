// wiki-oc.js
document.addEventListener("DOMContentLoaded", () => {
  const toc = document.getElementById("toc");
  const tocToggle = document.querySelector(".toc-toggle");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const expandAll = document.getElementById("expandAll");
  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  // Sommaire : masquer/afficher
  if (toc && tocToggle) {
    tocToggle.addEventListener("click", () => {
      const hidden = toc.classList.toggle("hidden");
      tocToggle.textContent = hidden ? "afficher" : "masquer";
      tocToggle.setAttribute("aria-expanded", String(!hidden));
    });
  }

  // Onglets biographie (data-tab <-> data-panel)
  document.querySelectorAll(".tab-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const tab = button.dataset.tab;

      document.querySelectorAll(".tab-btn").forEach((btn) => btn.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));

      button.classList.add("active");
      const target = document.querySelector(`.tab-panel[data-panel="${tab}"]`);
      if (target) target.classList.add("active");
    });
  });

  // Détails équipe : bouton + bloc juste après
  document.querySelectorAll(".toggle-details").forEach((button) => {
    button.addEventListener("click", () => {
      const details = button.nextElementSibling;
      if (!details) return;

      details.classList.toggle("open");
      button.textContent = details.classList.contains("open")
        ? "Masquer les détails"
        : "Afficher les détails";
    });
  });

  // Mobile : afficher/masquer la sidebar
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", () => {
      document.body.classList.toggle("show-sidebar");
      sidebarToggle.textContent = document.body.classList.contains("show-sidebar")
        ? "Masquer la barre latérale"
        : "Afficher la barre latérale";
    });
  }

  // Mobile : tout ouvrir / tout refermer
  if (expandAll) {
    expandAll.addEventListener("click", () => {
      const blocks = document.querySelectorAll(".hidden-details");
      const shouldOpen = [...blocks].some((b) => !b.classList.contains("open"));

      blocks.forEach((b) => b.classList.toggle("open", shouldOpen));
      document.querySelectorAll(".toggle-details").forEach((btn) => {
        btn.textContent = shouldOpen ? "Masquer les détails" : "Afficher les détails";
      });

      expandAll.textContent = shouldOpen ? "Tout refermer" : "Tout ouvrir";
    });
  }

  // Recherche simple : scroll sur la première zone qui contient le texte
  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;

      const targets = [
        ...document.querySelectorAll(".section"),
        document.querySelector(".article-header"),
        ...document.querySelectorAll(".team-card"),
        ...document.querySelectorAll(".data-card"),
      ].filter(Boolean);

      const match = targets.find((el) => el.textContent.toLowerCase().includes(query));

      if (match) {
        match.scrollIntoView({ behavior: "smooth", block: "start" });
        match.style.outline = "3px solid rgba(132,185,63,.45)";
        setTimeout(() => { match.style.outline = ""; }, 1800);
      } else {
        alert("Aucun résultat trouvé dans cette fiche.");
      }
    });
  }
});