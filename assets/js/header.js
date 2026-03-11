const headerContainer = document.getElementById("site-header");

if (headerContainer) {
    const body = document.body;

    // Valeurs globales par défaut
    const DEFAULTS = {
        siteTitle: "L'Atelier des Rêves",
        siteLogo: "𖤓",
        navTheme: "default"
    };

    // Récupère l'URL absolue du script actuel
    const scriptUrl = new URL(document.currentScript.src);

    // Remonte de /.assets/.code/js/ vers la racine du site
    const siteRoot = new URL("../../", scriptUrl);

    const links = [
        { label: "Blog", href: new URL("blog/index.html", siteRoot).href, key: "blog" },
        { label: "Games", href: new URL("games/index.html", siteRoot).href, key: "games" },
        { label: "Music", href: new URL("music/index.html", siteRoot).href, key: "music" },
        { label: "Works", href: new URL("works/index.html", siteRoot).href, key: "works" },
        { label: "OCs", href: new URL("ocs/index.html", siteRoot).href, key: "ocs" }
    ];

    const homeHref = new URL("index.html", siteRoot).href;

    // Valeurs personnalisées si présentes, sinon fallback
    const siteTitle = body.dataset.siteTitle || DEFAULTS.siteTitle;
    const siteLogo = body.dataset.siteLogo || DEFAULTS.siteLogo;
    const navTheme = body.dataset.navTheme || DEFAULTS.navTheme;

    // Détecte automatiquement la page courante si non précisée
    let currentPage = body.dataset.currentPage || "";

    if (!currentPage) {
        const currentPath = window.location.pathname.replace(/\\/g, "/");

        if (currentPath.endsWith("/index.html")) {
            currentPage = "home";
        } else if (currentPath.includes("/blog/")) {
            currentPage = "blog";
        } else if (currentPath.includes("/games/")) {
            currentPage = "games";
        } else if (currentPath.includes("/music/")) {
            currentPage = "music";
        } else if (currentPath.includes("/works/")) {
            currentPage = "works";
        } else if (currentPath.includes("/ocs/")) {
            currentPage = "ocs";
        }
    }

    // Applique le thème au body pour le CSS
    body.setAttribute("data-nav-theme", navTheme);

    const navLinks = links.map(link => {
        const isActive = link.key === currentPage ? "active" : "";
        return `<a href="${link.href}" class="${isActive}">${link.label}</a>`;
    }).join("");

    const siteTagline = body.dataset.siteTagline || "";

    headerContainer.innerHTML = `
        <header class="global-site-header">
            <a href="${homeHref}" class="global-site-brand">
                <div class="global-site-logo">${siteLogo}</div>
                <span class="global-site-title" data-site-tagline="${siteTagline}">${siteTitle}</span>
            </a>

            <nav class="global-site-nav" aria-label="Navigation principale">
                ${navLinks}
            </nav>
        </header>
    `;


}