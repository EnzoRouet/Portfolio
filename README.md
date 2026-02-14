# 🚀 Professional Portfolio - Full Stack Showcase

**Projet central** servant de vitrine à mes compétences techniques et à mes réalisations.
Une plateforme web complète intégrant une interface utilisateur dynamique et un micro-service Backend pour la gestion sécurisée des communications.

**🌐 Visiter le site :** [https://enzorouet.github.io/Portfolio/](https://enzorouet.github.io/Portfolio/)

![Aperçu du Portfolio](./img/preview.webp)

## 🎯 Contexte & Objectifs Pédagogiques

Ce projet a été conçu dans le cadre de mon **parcours de formation en autodidacte** pour démontrer ma capacité à livrer un produit fini, du design à l'architecture serveur.

L'objectif était de créer une expérience utilisateur fluide tout en appliquant des concepts de sécurité backend indispensables en production.

**Objectifs validés :**

- Développement d'une **interface Responsive** sans framework (CSS Grid & Flexbox).
- Implémentation d'un **micro-service Backend (Node.js/Express)**.
- Consommation d'API tierces (**Resend**) pour le traitement des mails.
- Sécurisation des échanges via la gestion des **CORS** et des variables d'environnement (`dotenv`).
- Déploiement hybride : Frontend sur **GitHub Pages** et Backend sur **Vercel**.

## 🛠️ Stack Technique

- **Frontend :** HTML5, CSS3, JavaScript Vanilla.
- **Backend :** Node.js, Express.js.
- **Sécurité & Services :** API Resend, CORS, Dotenv.
- **DevOps :** Workflow Git, Vercel (Serverless Functions).

## ✨ Fonctionnalités Développées

### 1. Service de Contact Sécurisé (Anti-Spam)

Développement d'une route API dédiée permettant l'envoi de messages sans exposer d'adresse email côté client.

- **Validation :** Filtrage des domaines d'emails temporaires (Yopmail, etc.) pour garantir la qualité des leads.
- **Sécurité :** Limitation des accès via une politique de CORS stricte.

### 2. UI Interactive & Animations

- **Intersection Observer API :** Animation dynamique des barres de progression des compétences lors du scroll.
- **Floating Icons :** Système de décoration en parallaxe légère pour dynamiser le header.
- **Smooth Scrolling :** Navigation interne fluide entre les sections.

### 3. SEO & Open Graph

Optimisation des meta-tags pour un référencement efficace et une présentation propre lors du partage sur les réseaux sociaux (LinkedIn, Twitter).

## 🏗️ Architecture du Code & Déploiement

Le projet sépare distinctement le client et le serveur pour répondre aux contraintes du Cloud moderne :

- **Frontend :** Hébergé sur GitHub Pages pour une disponibilité maximale.
- **Backend Serverless :** Contrairement à un serveur Node.js traditionnel "toujours actif", le backend a été configuré pour le **Serverless Computing** sur Vercel.
- **Optimisation :** Le code est exporté en tant que module, permettant à Vercel de l'exécuter uniquement lors des appels API, réduisant ainsi la consommation de ressources.

## 🧠 Challenges Techniques Résolus

### Migration vers une Architecture Serverless

Vercel n'acceptant pas les serveurs Express classiques en exécution continue, j'ai dû adapter mon point d'entrée (`server.js`).

- **Le problème :** Les routes Express ne sont pas nativement comprises par l'infrastructure serverless sans un bridge de configuration.
- **La solution :** Implémentation d'un export de l'application (`module.exports = app`) et configuration du fichier `vercel.json` pour router les requêtes vers des fonctions éphémères.

### Communication Cross-Origin (CORS)

Le frontend et le backend se trouvant sur des domaines différents, les requêtes étaient initialement bloquées par le navigateur.

- **La solution :** Configuration rigoureuse du middleware `cors` pour autoriser uniquement mon domaine GitHub Pages, protégeant ainsi l'API contre les utilisations malveillantes tierces.

## ⚙️ Installation & Lancement

### Local Development

1. **Cloner le projet :**

   ```bash
   git clone [https://github.com/EnzoRouet/Portfolio]
   ```

2. **Installer les dépendances (pour le serveur) :**

```Bash
npm install
```

3. **Configuration : Créez un fichier .env à la racine avec vos clés :**

```Extrait de code
RESEND_API_KEY=your_key
EMAIL_DESTINATION=your_email@example.com
```

4. **Lancer le serveur :**

```Bash
npm start
```
