(() => {
    const searchInput = document.querySelector('#oc-search-input');
    const filterButtons = [...document.querySelectorAll('.oc-filter')];
    const groups = [...document.querySelectorAll('.oc-group')];
    const cards = [...document.querySelectorAll('.oc-file')];
    const status = document.querySelector('#oc-results-status');
    const emptyState = document.querySelector('.oc-empty');

    if (!searchInput || !status || !emptyState || cards.length === 0) {
        return;
    }

    let activeFilter = 'all';

    const normalizeText = (value) => value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase('fr')
        .trim();

    const updateGallery = () => {
        const query = normalizeText(searchInput.value);
        let visibleTotal = 0;

        groups.forEach((group) => {
            const groupName = group.dataset.folder;
            const groupCards = [...group.querySelectorAll('.oc-file')];
            let visibleInGroup = 0;

            groupCards.forEach((card) => {
                const searchableText = normalizeText(card.dataset.search || card.textContent);
                const matchesSearch = query === '' || searchableText.includes(query);
                const matchesFilter = activeFilter === 'all' || activeFilter === groupName;
                const isVisible = matchesSearch && matchesFilter;

                card.hidden = !isVisible;

                if (isVisible) {
                    visibleInGroup += 1;
                    visibleTotal += 1;
                }
            });

            group.hidden = visibleInGroup === 0;

            const counter = group.querySelector('.oc-group__visible-count');
            if (counter) {
                counter.textContent = String(visibleInGroup);
            }
        });

        const plural = visibleTotal > 1 ? 'personnages affichés' : 'personnage affiché';
        status.textContent = `${visibleTotal} ${plural}`;
        emptyState.hidden = visibleTotal !== 0;
    };

    searchInput.addEventListener('input', updateGallery);

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            activeFilter = button.dataset.filter || 'all';

            filterButtons.forEach((item) => {
                const isActive = item === button;
                item.classList.toggle('is-active', isActive);
                item.setAttribute('aria-pressed', String(isActive));
            });

            updateGallery();
        });
    });

    updateGallery();
})();
