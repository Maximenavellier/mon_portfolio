// ===== DONNÉES PROJETS =====
const projets = [
  {
    titre: "Fazbear MP",
    image: "images/fazbearmp1.png",
    images: [
      "images/fazbearmp1.png",
      "images/fazbearmp2.png",
      "images/fazbearmp3.png",
    ],
    description: "Jeu vidéo de type survival horror réalisé en duo avec Unity.",
    description_detail:
      "Jeu vidéo de type survival horror réalisé en duo avec Antoine Lebègue sur Unity. Mon rôle était de créer le mini-jeu en 2D permettant au survivant de gagner.",
    techno: "Unity, C#, 2D Graphics",
    date: "2024",
    lien: "https://github.com/tonprofil/projet1",
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
    lien: "https://github.com/tonprofil/projet2",
  },
];

// ===== VARIABLES GLOBALES =====
let currentCarouselIndex = 0;

// ===== MODE SOMBRE =====
const darkModeToggle = document.getElementById("darkModeToggle");
if (darkModeToggle) {
  // Charger l'état sauvegardé
  const isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark");
    darkModeToggle.textContent = "☀️ Mode clair";
  }

  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDarkMode = document.body.classList.contains("dark");
    localStorage.setItem("darkMode", isDarkMode);
    darkModeToggle.textContent = isDarkMode
      ? "☀️ Mode clair"
      : "🌙 Mode sombre";
  });
}

// ===== CV DOWNLOAD =====
const downloadCV = document.getElementById("downloadCV");
if (downloadCV) {
  downloadCV.addEventListener("click", () => {
    alert("Téléchargement du CV lancé ✅");
  });
}

// ===== GÉNÉRATION PROJETS =====
const projetsContainer = document.getElementById("projetsContainer");
if (projetsContainer) {
  projets.forEach((projet, index) => {
    const card = document.createElement("div");
    card.className = "projet-card";
    card.innerHTML = `
            <img src="${projet.image}" alt="${projet.titre}">
            <h2>${projet.titre}</h2>
            <p>${projet.description}</p>
            <button class="btn-outline" data-index="${index}">Voir détails</button>
        `;
    projetsContainer.appendChild(card);
  });
}

// ===== CARROUSEL =====
function createCarousel(images) {
  if (!images || images.length === 0) return "<p>Aucune image</p>";

  if (images.length === 1) {
    return `<img src="${images[0]}" alt="Image projet" class="carousel-image">`;
  }

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

function initCarousel(images) {
  if (!images || images.length <= 1) return;

  currentCarouselIndex = 0;
  const track = document.getElementById("carouselTrack");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const indicators = document.getElementById("indicators");

  // Créer indicateurs
  indicators.innerHTML = "";
  images.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = `indicator ${index === 0 ? "active" : ""}`;
    dot.addEventListener("click", () => goToSlide(index));
    indicators.appendChild(dot);
  });

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

  prevBtn.addEventListener("click", prevSlide);
  nextBtn.addEventListener("click", nextSlide);

  updateCarousel();
}

// ===== MODALE =====
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

function openModal(projectIndex) {
  const projet = projets[projectIndex];
  if (!projet || !modal) return;

  document.getElementById("modalTitle").textContent = projet.titre;
  document.getElementById("modalDesc").textContent =
    projet.description_detail || projet.description;
  document.getElementById("modalTech").textContent = projet.techno;
  document.getElementById("modalDate").textContent = projet.date;
  document.getElementById("modalLink").href = projet.lien;

  const images =
    projet.images && projet.images.length > 0 ? projet.images : [projet.image];
  document.getElementById("modalImages").innerHTML = createCarousel(images);

  if (images.length > 1) {
    setTimeout(() => initCarousel(images), 100);
  }

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function closeModalFunc() {
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
  }
}

// ===== EVENT LISTENERS =====
if (projetsContainer) {
  projetsContainer.addEventListener("click", (e) => {
    const button = e.target.closest("button[data-index]");
    if (button) {
      const index = parseInt(button.dataset.index, 10);
      openModal(index);
    }
  });
}

if (closeModal) {
  closeModal.addEventListener("click", closeModalFunc);
}

if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModalFunc();
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.style.display === "flex") {
    closeModalFunc();
  }
});
