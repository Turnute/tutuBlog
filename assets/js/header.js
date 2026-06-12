const headerContainer = document.getElementById("site-header");

if (headerContainer) {
    const body = document.body;

    const DEFAULTS = {
        siteTitle: "L'Atelier des Rêves",
        siteLogo: "𖤓",
        navTheme: "default"
    };

    const scriptUrl = new URL(document.currentScript.src);
    const siteRoot = new URL("../../", scriptUrl);

    const links = [
        { label: "Blog", href: new URL("blog/index.html", siteRoot).href, key: "blog" },
        { label: "Jeux", href: new URL("games/index.html", siteRoot).href, key: "games" },
        { label: "Musique", href: new URL("music/index.html", siteRoot).href, key: "music" },
        { label: "Écrits", href: new URL("works/index.html", siteRoot).href, key: "works" },
        { label: "OCs", href: new URL("ocs/index.html", siteRoot).href, key: "ocs" }
    ];

    const homeHref = new URL("index.html", siteRoot).href;

    const siteTitle = body.dataset.siteTitle || DEFAULTS.siteTitle;
    const siteLogo = body.dataset.siteLogo || DEFAULTS.siteLogo;
    const navTheme = body.dataset.navTheme || DEFAULTS.navTheme;
    const siteTagline = body.dataset.siteTagline || "";

    let currentPage = body.dataset.currentPage || "";

    if (!currentPage) {
        const path = window.location.pathname.replace(/\\/g, "/");

        // On teste les dossiers avant /index.html, sinon blog/index.html était vu comme l'accueil.
        if (path.includes("/ocs/")) {
            currentPage = "ocs";
        } else if (path.includes("/blog/")) {
            currentPage = "blog";
        } else if (path.includes("/games/")) {
            currentPage = "games";
        } else if (path.includes("/music/")) {
            currentPage = "music";
        } else if (path.includes("/works/")) {
            currentPage = "works";
        } else {
            currentPage = "home";
        }
    }

    body.setAttribute("data-nav-theme", navTheme);

    const navLinks = links.map(link => {
        const isActive = link.key === currentPage;
        const activeClass = isActive ? " active" : "";
        const ariaCurrent = isActive ? ' aria-current="page"' : "";

        return `<a href="${link.href}" class="global-site-nav__link${activeClass}"${ariaCurrent}>${link.label}</a>`;
    }).join("");

    headerContainer.innerHTML = `
        <header class="global-site-header">
            <a href="${homeHref}" class="global-site-brand">
                <div class="global-site-logo" aria-hidden="true">${siteLogo}</div>
                <span class="global-site-title" data-site-tagline="${siteTagline}">${siteTitle}</span>
            </a>

            <nav class="global-site-nav" aria-label="Navigation principale">
                ${navLinks}
            </nav>
        </header>
    `;
}
