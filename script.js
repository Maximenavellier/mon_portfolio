// --- Mode sombre / clair ---
const toggleBtn = document.getElementById("darkModeToggle");
if (toggleBtn) {
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggleBtn.textContent = document.body.classList.contains("dark")
      ? "☀️ Mode clair"
      : "🌙 Mode sombre";
  });
}

// --- Confirmation téléchargement CV ---
const cvBtn = document.getElementById("downloadCV");
if (cvBtn) {
  cvBtn.addEventListener("click", () => {
    alert("Téléchargement du CV lancé ✅");
  });
}

// --- Données projets ---
const projets = [
  {
    titre: "Fazbear MP",
    image: "images/fazbearmp1.png",
    images_detail: [
      "images/fazbearmp1.png",
      "images/fazbearmp2.png",
      "images/fazbearmp3.png",
    ],
    description:
      "Jeux vidéo de type survival horror réalisé en duo avec Unity.",
    description_detail:
      "Jeux vidéo de type survival horror réalisé en duo avec Antoine Lebègue sur Unity. Mon rôle étant de créer le mini-jeu en 2D permettant au survivant de gagner.",
    techno: "HTML, CSS",
    date: "2024",
    lien: "https://github.com/tonprofil/projet1",
  },
  {
    titre: "Whatwewatchingboyz",
    image: "images/projet2.png",
    images_detail: ["images/projet2.png"],
    description: "Application mobile en Flutter.",
    description_detail:
      "Application mobile en Flutter réalisée pour tester la techno.",
    techno: "Flutter, Dart",
    date: "2025",
    lien: "https://github.com/tonprofil/projet2",
  },
];

// --- Génération dynamique des projets ---
const container = document.getElementById("projetsContainer");
if (container) {
  container.innerHTML = "";
  projets.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "projet-card";
    card.innerHTML = `
      <img src="${p.image}" alt="${p.titre}">
      <h2>${p.titre}</h2>
      <p>${p.description}</p>
      <button class="btn-outline" data-index="${i}">Détails</button>
    `;
    container.appendChild(card);
  });
}

// --- Références modale ---
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalImgs = document.getElementById("modalImgs");
const modalDesc = document.getElementById("modalDesc");
const modalTech = document.getElementById("modalTech");
const modalDate = document.getElementById("modalDate");
const modalLink = document.getElementById("modalLink");
const closeModalBtn = document.getElementById("closeModal");

// --- Ouvrir la modale ---
if (container && modal) {
  container.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-index]");
    if (!btn) return;

    const index = btn.dataset.index;
    const p = projets[index];
    if (!p) return;

    modalTitle.textContent = p.titre || "";

    modalImgs.innerHTML = "";
    const imagesToShow =
      Array.isArray(p.images_detail) && p.images_detail.length
        ? p.images_detail
        : [p.image];

    imagesToShow.forEach((src) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = p.titre || "";
      img.className = "modal-image";
      modalImgs.appendChild(img);
    });

    modalDesc.textContent =
      p.description_detail && p.description_detail.trim() !== ""
        ? p.description_detail
        : p.description || "";

    modalTech.textContent = p.techno || "";
    modalDate.textContent = p.date || "";
    modalLink.href = p.lien || "#";

    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
  });

  const closeModalFunction = () => {
    modal.style.display = "none";
    document.body.style.overflow = "";
  };

  closeModalBtn.addEventListener("click", closeModalFunction);

  window.addEventListener("click", (e) => {
    if (e.target === modal) closeModalFunction();
  });
}
