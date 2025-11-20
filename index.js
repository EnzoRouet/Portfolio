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

    const name = document.getElementById("name").value;
    const email = document.getElementById("mail").value;
    const message = document.getElementById("message").value;

    const API_ENDPOINT = "https://portfolio-wm61.vercel.app/send-email";

    formStatus.textContent = "Envoi en cours...";
    formStatus.style.color = "#63a3fa";

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
        formStatus.style.color = "#34d399";
        contactForm.reset();
      } else {
        formStatus.textContent = `Erreur: ${
          result.error || "Veuillez réessayer."
        }`;
        formStatus.style.color = "#FF6347";
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      formStatus.textContent =
        "Erreur de connexion au serveur (êtes-vous en ligne ?)";
      formStatus.style.color = "#FF6347";
    }
  });
}
