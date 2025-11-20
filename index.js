const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const bars = entry.target.querySelectorAll(".bar-fill");

      if (entry.isIntersecting) {
        bars.forEach((bar) => {
          bar.classList.add("is-visible");
        });
      } else {
        bars.forEach((bar) => {
          bar.classList.remove("is-visible");
        });
      }
    });
  },
  {
    threshold: 0.5,
  }
);

const skillCards = document.querySelectorAll(".container");
skillCards.forEach((card) => {
  observer.observe(card);
});

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Récupération des données
    // VERIFIE BIEN QUE DANS TON HTML L'ID EST BIEN "mail" ET PAS "email"
    const name = document.getElementById("name").value;
    const email = document.getElementById("mail").value;
    const message = document.getElementById("message").value;

    // --- CONFIGURATION DE L'ADRESSE DU SERVEUR ---
    // 1. Va sur Vercel, déploie ton backend.
    // 2. Copie l'URL qu'ils te donnent (ex: https://mon-portfolio-api.vercel.app)
    // 3. Colle-la ci-dessous entre les guillemets :

    const API_ENDPOINT = "http://localhost:3000/send-email";
    // ⚠️ Une fois déployé, remplace la ligne du dessus par :
    // const API_ENDPOINT = "https://ton-projet-vercel.app/send-email";

    formStatus.textContent = "Envoi en cours...";
    formStatus.style.color = "#63a3fa"; // Bleu

    try {
      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();

      if (response.ok) {
        formStatus.textContent = "Message envoyé ! Je vous réponds très vite.";
        formStatus.style.color = "#34d399"; // Vert
        contactForm.reset(); // Vider le formulaire
      } else {
        formStatus.textContent = `Erreur: ${
          result.error || "Veuillez réessayer."
        }`;
        formStatus.style.color = "#FF6347"; // Rouge
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      formStatus.textContent =
        "Erreur de connexion au serveur (êtes-vous en ligne ?)";
      formStatus.style.color = "#FF6347"; // Rouge
    }
  });
}
