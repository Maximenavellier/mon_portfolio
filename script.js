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
    image: "images/fazbearmp.png",
    description:
      "Jeux vidéo de type survival horror réalisé en duo avec Unity.",
    description_detail:
      "Jeux vidéo de type survival horror réalisé en duo avec Antoine lebègue sur Unity. Mon role étant de créer le mini jeux en 2d permettant au survivant de gagner.",
    techno: "HTML, CSS",
    date: "2024",
    lien: "https://github.com/tonprofil/projet1",
  },
  {
    titre: "Projet 2",
    image: "images/projet2.png",
    description: "Application mobile en Flutter.",
    description_detail: "",
    techno: "Flutter, Dart",
    date: "2025",
    lien: "https://github.com/tonprofil/projet2",
  },
  {
    titre: "Projet 3",
    image: "images/projet3.png",
    description: "Petit jeu 2D en Unity.",
    description_detail: "",
    techno: "Unity, C#",
    date: "2025",
    lien: "https://github.com/tonprofil/projet3",
  },
];

// --- Génération dynamique des projets ---
const container = document.getElementById("projetsContainer");
if (container) {
  projets.forEach((p, i) => {
    const card = document.createElement("div");
    card.classList.add("projet-card");
    card.innerHTML = `
      <img src="${p.image}" alt="${p.titre}">
      <h2>${p.titre}</h2>
      <p>${p.description}</p>
      <a href="${p.lien}" target="_blank" class="btn">Voir sur GitHub</a>
      <button class="btn-outline" data-index="${i}">Détails</button>
    `;
    container.appendChild(card);
  });
}

// --- Modale détails ---
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");

if (container && modal) {
  container.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const index = e.target.dataset.index;
      const p = projets[index];
      document.getElementById("modalTitle").textContent = p.titre;
      document.getElementById("modalImg").src = p.image;
      document.getElementById("modalDesc").textContent = p.description;
      document.getElementById("modalDesc").textContent = p.description_detail;
      document.getElementById("modalTech").textContent = p.techno;
      document.getElementById("modalDate").textContent = p.date;
      document.getElementById("modalLink").href = p.lien;
      modal.style.display = "flex";
    }
  });

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
}

// --- Scroll fluide (index -> projets) ---
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
