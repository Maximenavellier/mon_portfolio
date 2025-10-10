const projets = [
  {
    titre: "Fazbear MP",
    image: "images/fazbearmp1.png", // Image principale affichée sur la carte
    images: [
      // Images pour le carrousel dans la modale
      "images/fazbearmp1.png",
      "images/fazbearmp2.png",
      "images/fazbearmp3.png",
    ],
    description: "Jeu vidéo de type survival horror réalisé en duo avec Unity.",
    description_detail:
      "Jeu vidéo de type survival horror réalisé avec un camarade sur Unity. Mon rôle était de créer le mini-jeu en 2D permettant, après réussites de 3 niveaux a difficulté croissante, au survivant de gagner.", // Description longue pour la modale
    techno: "Unity, C#, 2D Graphics",
    date: "2024",
  },
  {
    titre: "Whatwewatchingboyz",
    image: "images/projet2.png",
    images: ["images/projet2.png"],
    description: "Application mobile en Flutter.",
    description_detail:
      "Application mobile en Flutter réalisée pour tester la technologie et créer une interface de recommandation de films.",
    techno: "Flutter, Dart, API REST",
    date: "2025",
    lien: "https://github.com/SCEEPWARE/whatwewatchinboys",
  },
];

//  VARIABLES GLOBALES
let currentCarouselIndex = 0; // Suit l'image actuellement affichée dans le carrousel

//  MODE SOMBRE
const darkModeToggle = document.getElementById("darkModeToggle");
if (darkModeToggle) {
  // Vérifie si le mode sombre est sauvegardé dans le navigateur
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark");
    darkModeToggle.textContent = "☀️ Mode clair";
  }

  // Ajoute un écouteur d'événement sur le bouton
  darkModeToggle.addEventListener("click", () => {
    // Bascule la classe 'dark' sur le body
    document.body.classList.toggle("dark");
    const isDarkMode = document.body.classList.contains("dark");
    // Sauvegarde le choix dans le localStorage
    localStorage.setItem("darkMode", isDarkMode);
    // Met à jour le texte du bouton
    darkModeToggle.textContent = isDarkMode
      ? "☀️ Mode clair"
      : "🌙 Mode sombre";
  });
}

//  CV DOWNLOAD
// Affiche une alerte simple lors du clic sur le bouton de téléchargement du CV.
const downloadCV = document.getElementById("downloadCV");
if (downloadCV) {
  downloadCV.addEventListener("click", () => {
    alert("Téléchargement du CV lancé ✅");
  });
}

//  GÉNÉRATION PROJETS
// Cible le conteneur où les projets doivent être affichés.
const projetsContainer = document.getElementById("projetsContainer");
if (projetsContainer) {
  // Boucle sur le tableau de projets pour créer une carte pour chacun.
  projets.forEach((projet, index) => {
    const card = document.createElement("div");
    card.className = "projet-card"; // Utilise le style .projet-card du CSS
    // Remplit la carte avec les informations du projet.
    card.innerHTML = `
            <img src="${projet.image}" alt="${projet.titre}">
            <h2>${projet.titre}</h2>
            <p>${projet.description}</p>
            <button class="btn-outline" data-index="${index}">Voir détails</button>
        `;
    // Ajoute la carte nouvellement créée à la page.
    projetsContainer.appendChild(card);
  });
}

//  CARROUSEL
/**
 * Crée le HTML pour un carrousel d'images.
 * @param {string[]} images - Un tableau d'URL d'images.
 * @returns {string} Le code HTML du carrousel.
 */
function createCarousel(images) {
  if (!images || images.length === 0) return "<p>Aucune image</p>";

  // Si une seule image, on l'affiche simplement sans les contrôles du carrousel.
  if (images.length === 1) {
    return `<img src="${images[0]}" alt="Image projet" class="carousel-image">`;
  }

  // Construit le HTML pour le carrousel avec les slides, boutons et indicateurs.
  let html = `<div class="carousel-container">
        <div class="carousel-track" id="carouselTrack">`;

  images.forEach((img, index) => {
    html += `<div class="carousel-slide">
            <img src="${img}" alt="Image ${index + 1}" class="carousel-image">
        </div>`;
  });

  html += `</div>
        <button class="carousel-btn prev" id="prevBtn">‹</button>
        <button class="carousel-btn next" id="nextBtn">›</button>
    </div>
    <div class="carousel-indicators" id="indicators"></div>`;

  return html;
}

/**
 * Initialise la logique du carrousel (navigation, indicateurs).
 * @param {string[]} images - Le tableau d'images du carrousel.
 */
function initCarousel(images) {
  if (!images || images.length <= 1) return; // Pas besoin de logique si 0 ou 1 image

  currentCarouselIndex = 0;
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicators = document.getElementById("indicators");

  // Crée les points indicateurs sous le carrousel.
  indicators.innerHTML = "";
  images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `indicator ${index === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => goToSlide(index));
    indicators.appendChild(dot);
  });

  // Met à jour la position du carrousel et l'indicateur actif.
  function updateCarousel() {
    track.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;
    document.querySelectorAll(".indicator").forEach((dot, index) => {
      dot.classList.toggle("active", index === currentCarouselIndex);
    });
  }

  function goToSlide(index) {
    currentCarouselIndex = index;
    updateCarousel();
  }

  function nextSlide() {
    currentCarouselIndex = (currentCarouselIndex + 1) % images.length;
    updateCarousel();
  }

  function prevSlide() {
    currentCarouselIndex =
      (currentCarouselIndex - 1 + images.length) % images.length;
    updateCarousel();
  }

  // Attache les fonctions aux clics sur les boutons.
  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  updateCarousel(); // Affiche la première slide correctement.
}

//  MODALE
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

/**
 * Ouvre la modale et la remplit avec les informations du projet sélectionné.
 * @param {number} projectIndex - L'index du projet dans le tableau `projets`.
 */
function openModal(projectIndex) {
  const projet = projets[projectIndex];
  if (!projet || !modal) return;

  // Remplit les champs de la modale avec les données du projet.
  document.getElementById("modalTitle").textContent = projet.titre;
  document.getElementById("modalDesc").textContent =
    projet.description_detail || projet.description;
  document.getElementById("modalTech").textContent = projet.techno;
  document.getElementById("modalDate").textContent = projet.date;
  document.getElementById("modalLink").href = projet.lien;

  // Crée et insère le carrousel d'images.
  const images =
    projet.images && projet.images.length > 0 ? projet.images : [projet.image];
  document.getElementById("modalImages").innerHTML = createCarousel(images);

  // Initialise la logique du carrousel si nécessaire.
  if (images.length > 1) {
    setTimeout(() => initCarousel(images), 100); // Léger délai pour s'assurer que le HTML est bien dans le DOM.
  }

  // Affiche la modale et bloque le défilement de la page.
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

/**
 * Ferme la fenêtre modale.
 */
function closeModalFunc() {
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = ""; // Réactive le défilement.
  }
}

//  EVENT LISTENERS (Écouteurs d'événements)
// Gère les clics sur les boutons "Voir détails" des cartes de projet.
if (projetsContainer) {
  projetsContainer.addEventListener("click", (e) => {
    const button = e.target.closest("button[data-index]");
    if (button) {
      const index = parseInt(button.dataset.index, 10);
      openModal(index);
    }
  });
}

// Gère le clic sur le bouton de fermeture de la modale.
if (closeModal) {
  closeModal.addEventListener("click", closeModalFunc);
}

// Gère le clic en dehors du contenu de la modale pour la fermer.
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModalFunc();
  });
}

// Gère l'appui sur la touche "Echap" pour fermer la modale.
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.style.display === "flex") {
    closeModalFunc();
  }
});
