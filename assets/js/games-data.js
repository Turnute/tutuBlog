/*
 * Pour ajouter un jeu, dupliquez un objet de cette liste.
 * Un média peut être une image (type: "image" ou "card")
 * ou une vidéo YouTube (type: "youtube", avec son identifiant).
 * Le premier objet est sélectionné automatiquement à l’ouverture de la page.
 */
window.GAMES_DATA = [
    {
        id: "dimanche-aprem",
        title: "Dimanche Après-Midi",
        date: "2025",
        status: "Game jam",
        genre: "Auto-Runner",
        description: "À l’arrière d’une voiture pendant un long trajet, un enfant tente d’échapper aux disputes de ses parents par l’imagination. En regardant défiler le paysage, il imagine un petit personnage y courir, tandis que la réalité rattrape parfois le rêve.",
        link: "https://drive.google.com/file/d/17h_qL81TVz18pCI7oGfNsr8dMQzk8s6T/view?usp=sharing",
        icon: "../assets/images/games/dimanche-aprem-card.png",
        media: [
            { type: "image", src: "../assets/images/games/dimanche-aprem.png", alt: "Capture d'écran du jeu Dimanche Après-Midi" },
        ]
    },
    {
        id: "amato",
        title: "Amato, The Forest Spirit",
        date: "2024",
        status: "Prototype étudiant",
        genre: "Action",
        description: "Le prototype étudiant à l’origine d’Amato, The Rolling Adventure. Quatre niveaux rassemblent les premiers concepts et visuels imaginés par l’équipe avant le développement du jeu final.",
        link: "https://turnute.itch.io/amato-the-forest-spirit",
        icon: "../assets/images/games/amato-card.png",
        media: [
            { type: "youtube", id: "4b-XrBBLGy8", title: "Trailer Amato" },
            { type: "image", src: "../assets/images/games/amato-01.jpg", alt: "Vue d’un niveau du prototype Amato" },
            { type: "image", src: "../assets/images/games/amato-02.jpg", alt: "Vue d’un niveau du prototype Amato" },
            { type: "image", src: "../assets/images/games/amato-03.jpg", alt: "Vue d’un niveau du prototype Amato" }
        ]
    },
    {
        id: "kart-crous",
        title: "Kart Crous",
        date: "2024",
        status: "Game jam",
        genre: "Action",
        description: "Aux Jeux Olympiques de Poitiers de 2028, une nouvelle discipline fait son entrée : le Carambolage Explosif. Deux joueurs s’affrontent en véhicules dans une arène, avec pour objectif d’éjecter ou de détruire leur adversaire.",
        link: "https://redline33100.itch.io/kart-crous",
        icon: "../assets/images/games/kart-crous-card.png",
        media: [
            { type: "image", src: "../assets/images/games/kart-crous-01.png", alt: "Capture d'écran du jeu Kart Crous" },
            { type: "image", src: "../assets/images/games/kart-crous-02.png", alt: "Capture d'écran du jeu Kart Crous" },
            { type: "image", src: "../assets/images/games/kart-crous-03.png", alt: "Capture d'écran du menu du jeu Kart Crous" }
        ]
    },
    {
        id: "mcs-tea-time",
        title: "MC's TEA Time",
        date: "2023",
        status: "Game Jam",
        genre: "Platformer",
        description: "MC, petit robot chargé de l’entretien d’un TER en l’an 30XX, se trompe de voie et atterrit entre les villes de la Terre, de l’Eau et de l’Air. Il lui faudra aider leurs habitants pour pouvoir repartir.",
        link: "https://turnute.itch.io/mcs-tea-time",
        icon: "../assets/images/games/mc-tea-card.png",
        media: [
            { type: "image", src: "../assets/images/games/mc-tea-01.jpg", alt: "Vue d’un niveau de MC's TEA Time" },
            { type: "youtube", id: "dWt7V3RrsaE", title: "Water Town — bande originale de MC's TEA Time", caption: "Water Town, extrait de la bande originale du jeu." }
        ]
    },
    {
        id: "bird-up",
        title: "Bird Up",
        date: "2023",
        status: "Vertical slice",
        genre: "Rage Game",
        description: "Un pauvre oisillon dodu est tombé de son nid. Aidez le à remonter à petit coups de canne, mais attention à ne pas finir plus bas que là où vous avez commencé.",
        link: "https://drive.google.com/file/d/1VAsuRP3DSfAQWi2Sk5j4v5rkbshf7sSU/view?usp=sharing",
        icon: "../assets/images/games/bird-up-card.png",
        media: [
            { type: "youtube", id: "K9-Z5NfLj2U", title: "Trailer Bird Up" },
        ]
    },
    {
        id: "summoners-duel",
        title: "Summoner's Duel",
        date: "2023",
        status: "Jeu complet",
        genre: "Cartes & plateau",
        description: "Un duel compétitif pour deux joueurs qui mêle affrontement JCC à la navigation d’un jeu de plateau. Deux invocateurs se disputent le pouvoir d’une forêt magique qui ne compte pas rester passive.",
        link: "https://turnute.itch.io/summoners-duel",
        icon: "../assets/images/games/summoners-duel-card.png",
        media: [
            { type: "image", src: "../assets/images/games/summoners-duel-01.jpg", alt: "Plateau et cartes de Summoner's Duel", caption: "Le plateau module le face-à-face entre les deux invocateurs." },
            { type: "image", src: "../assets/images/games/summoners-duel-02.png", alt: "Plateau et cartes de Summoner's Duel", caption: "Un jeu de cartes compétitif prévu pour des parties d’environ une heure." },
            { type: "image", src: "../assets/images/games/summoners-duel-03.png", alt: "Plateau et cartes de Summoner's Duel", caption: "Le jeu est également disponible sur Tabletop Simulator." }
        ]
    },
    {
        id: "hooman-octo",
        title: "Hooman & Octo",
        date: "2022",
        status: "Game Jam",
        genre: "Puzzle / coop locale",
        description: "Cinq cents ans dans le futur, Poitiers est sous les eaux. Quand la centrale de la cathédrale Saint-Pierre tombe en panne, Hooman la pieuvre et Octo l’humain doivent coopérer pour éviter une crise énergétique et diplomatique.",
        link: "https://turnute.itch.io/hooman-and-octo-energy-failure-in-poitiers",
        icon: "../assets/images/games/hooman-octo-card.png",
        media: [
            { type: "card", src: "../assets/images/games/hooman-octo-card.png", alt: "Affiche de Hooman & Octo: Energy Failure in Poitiers", caption: "Un prototype coopératif créé pour la Gamejam au Palais 2022." },
            { type: "image", src: "../assets/images/games/hooman-octo.jpg", alt: "Screenshot", caption: "Un joueur joue Octo à la manette, l'autre Hooman au clavier." },
            { type: "youtube", id: "fErTDV7JiAs", title: "Octo Ambiance - bande originale d'Hooman & Octo", caption: "Octo Ambiance, extrait de la bande originale du jeu."}
        ]
    },
    {
        id: "showdown",
        title: "Showdown of the Dark Lords",
        date: "2022",
        status: "Prototype étudiant",
        genre: "Stratégie tactique",
        description: "Deux Seigneurs des Ténèbres convoitent la même région, menant à un affrontement de leurs minions. Ce jeu tactique en multijoueur local a été réalisé sous RPG Maker 2003.",
        link: "https://turnute.itch.io/showdown-of-the-dark-lords",
        icon: "../assets/images/games/showdown-card.png",
        media: [
            { type: "card", src: "../assets/images/games/showdown-cardd.png", alt: "Écran de Showdown of the Dark Lords: Blob Wars", caption: "Un duel tactique en multijoueur local." }
        ]
    },
    {
        id: "slimeformer",
        title: "Slimeformer",
        date: "2022",
        status: "Prototype étudiant",
        genre: "Plateforme 3D",
        description: "Un prototype de jeu de plateforme en trois dimensions dans lequel on dirige une petite boule de slime.",
        link: "https://turnute.itch.io/slimeformer",
        icon: "../assets/images/games/slimeformer-card.png",
        media: [
            { type: "card", src: "../assets/images/games/slimeformer-card.png", alt: "Capture du prototype Slimeformer", caption: "Une petite boule de slime dans un platformer 3D." }
        ]
    },
    {
        id: "lethal-bully-land",
        title: "Lethal Bully Land",
        date: "2021",
        status: "Prototype étudiant",
        genre: "Puzzle / action",
        description: "Une infestation de slimes, un petit robot et beaucoup de lave. Inspiré par les Bullies de Super Mario 64, le jeu demande de nettoyer chaque niveau à coups d’explosions, de sauts et de dashes.",
        link: "https://turnute.itch.io/lethal-bully-land",
        icon: "../assets/images/games/lethal-bully-card.png",
        media: [
            { type: "card", src: "../assets/images/games/lethal-bully-card.png", alt: "Capture de Lethal Bully Land dans un niveau de lave", caption: "Repousser les slimes dans la lave sans y tomber soi-même." }
        ]
    },
    {
        id: "checkm8",
        title: "Checkm8",
        date: "2021",
        status: "Prototype étudiant",
        genre: "Stratégie / party game",
        description: "Les échecs rencontrent le party game. De une à quatre personnes s’affrontent sur un plateau où des événements aléatoires peuvent bouleverser la partie, que l’on soit novice ou joueuse chevronnée.",
        link: "https://turnute.itch.io/checkm8",
        icon: "../assets/images/games/checkm8-card.png",
        media: [
            { type: "card", src: "../assets/images/games/checkm8-card.png", alt: "Illustration du jeu Checkm8 avec des pièces d’échecs", caption: "Une relecture chaotique des échecs pour une à quatre personnes." }
        ]
    },
    {
        id: "silent-in-space",
        title: "Silent In Space",
        date: "2020",
        status: "Prototype étudiant",
        genre: "Aventure textuelle",
        description: "Après un réveil à bord d’un vaisseau extraterrestre, il faut choisir comment retrouver sa liberté : se faire des alliés parmi les aliens ou les affronter. Une aventure textuelle dans l’esprit des jeux sur micro-ordinateurs des années 1970.",
        link: "https://turnute.itch.io/silent-in-space",
        icon: "../assets/images/games/silent-space-card.png",
        media: [
            { type: "card", src: "../assets/images/games/silent-space-card.png", alt: "Illustration pixel art de Silent In Space", caption: "Une aventure textuelle rétro à bord d’un vaisseau alien." }
        ]
    },
    {
        id: "viruzator",
        title: "The VIRUZATOR",
        date: "2020",
        status: "Game Jam",
        genre: "FPS",
        description: "Armé du VIRUZATOR, un professeur mégalomane transforme chaque cible en zombie. Le problème : ses propres créations ne semblent pas comprendre qu’il est de leur côté.",
        link: "https://turnute.itch.io/viruzator",
        icon: "../assets/images/games/viruzator-card.png",
        media: [
            { type: "image", src: "../assets/images/games/viruzator-01.png", alt: "Capture de The VIRUZATOR", caption: "Convertir le monde tout en esquivant ses propres créations." },
            { type: "image", src: "../assets/images/games/viruzator-02.png", alt: "Capture de The VIRUZATOR", caption: "Une démo de shooter conçue pendant une game jam." },
            { type: "image", src: "../assets/images/games/viruzator-03.png", alt: "Capture de The VIRUZATOR", caption: "Quelques prototypes se cachent encore dans les coins de la carte." }
        ]
    }
];
