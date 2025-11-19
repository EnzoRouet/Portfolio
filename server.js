// --- Mini-API pour Formulaire de Contact ---
// Ce code est à exécuter sur un serveur (Node.js)

// 1. Importer les dépendances
// Tu auras besoin de faire : npm install express resend cors dotenv
const express = require("express");
const { Resend } = require("resend");
const cors = require("cors");
require("dotenv").config(); // Pour charger les clés secrètes

// 2. Initialiser l'app
const app = express();
app.use(express.json()); // Permet à Express de lire le JSON envoyé par le formulaire

// 3. Configurer CORS (Cross-Origin Resource Sharing)
// TRÈS IMPORTANT : Remplace 'https://ton-portfolio.com' par l'URL de ton site en prod
// ou '*' pour tester en local.
app.use(
  cors({
    origin: "https://ton-portfolio.com",
  })
);

// 4. Initialiser Resend avec ta clé API secrète
// Crée un fichier .env et mets-y ta clé : RESEND_API_KEY=re_...
const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    }

    const blockedDomains = [
      "yopmail.com",
      "tempmail.com",
      "10minutemail.com",
      "mailinator.com",
      "guerrillamail.com",
    ];

    const domain = email.split("@")[1];
    if (blockedDomains.includes(domain)) {
      return res
        .status(400)
        .json({ error: "Les emails temporaires ne sont pas autorisés." });
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio <contact@ton-domaine.com>",
      to: ["ton-email-perso@gmail.com"],
      subject: `Nouveau message de ${name} depuis le portfolio`,
      html: `
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erreur lors de l'envoi de l'email." });
    }

    res.status(200).json({ message: "Email envoyé avec succès !", data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
