Frenz 
Une plateforme sociale moderne inspirée de Reddit, développée avec Strapi et React. Frenz permet aux utilisateurs de créer, partager et découvrir du contenu organisé par thématiques.

📋 Table des matières
* Aperçu
* Fonctionnalités
* Technologies
* Installation
* Configuration
* Utilisation
* API Endpoints
* Structure du projet
* Contribuer

Aperçu
Frenz est une plateforme sociale qui permet aux utilisateurs de :
* Créer et partager des posts organisés par thématiques
* Commenter et interagir avec le contenu
* Sauvegarder leurs posts favoris
* Découvrir du contenu tendance
* Personnaliser leur profil


Fonctionnalités

Authentification
* Inscription et connexion sécurisées
* Gestion des sessions utilisateur
* Changement de mot de passe

Posts
* Création de posts avec images
* Organisation par thématiques (couleurs personnalisées)
* Système de likes
* Sauvegarde de posts
* Édition et suppression

Commentaires
* Ajout et édition de commentaires
* Suppression de commentaires
* Système de réponses

Profils utilisateur
* Page profil personnalisable
* Upload d'image de profil
* Statistiques utilisateur
* Historique des posts

Recherche et navigation
* Recherche en temps réel (posts et thématiques)
* Navigation par thématiques (SubFrenz)
* Suggestions personnalisées

Interface
* Design responsive (mobile-friendly)
* Mode sombre
* Notifications
* Sidebar avec tendances tech


🛠 Technologies

Frontend
* React 18 - Framework JavaScript
* React Router - Navigation
* Axios - Requêtes HTTP
* Tailwind CSS - Styling
* DaisyUI - Composants UI
* Lucide React - Icônes
* Fuse.js - Recherche floue

Backend
* Strapi - CMS headless
* Node.js - Runtime JavaScript
* PostgreSQL (Neon) - Base de données

Outils
* Vite - Build tool
* ESLint - Linting

🚀 Installation
Prérequis
* Node.js (v18 ou plus)
* npm ou yarn
* Base de données PostgreSQL (Neon)

1. Cloner le repository
git clone https://github.com/KJovene/Frenz.git
cd frenz
2. Configuration Backend (Strapi)
cd backend
npm install
npm run build
3. Configuration Frontend
cd frontend
npm install


⚙️ Configuration
Variables d'environnement Backend
Créez un fichier .env dans le dossier backend :
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt

DATABASE_CLIENT=postgres
DATABASE_HOST=your-neon-host
DATABASE_PORT=5432
DATABASE_NAME=your-database-name
DATABASE_USERNAME=your-username
DATABASE_PASSWORD=your-password
DATABASE_SSL=true
Configuration Frontend
Créez un fichier config.js dans le dossier frontend/src :
export const API_URL = 'http://localhost:1337/api';

Utilisation

Démarrer le backend
cd backend
npm run develop

Démarrer le frontend
cd frontend
npm run dev
L'application sera accessible sur :
* Frontend : http://localhost:5173
* Backend Admin : http://localhost:1337/admin

API Endpoints

Authentification
* POST /auth/local/register - Inscription
* POST /auth/local - Connexion
* POST /auth/change-password - Changement de mot de passe

Posts
* GET /post-frenzs - Liste des posts
* POST /post-frenzs - Créer un post
* PUT /post-frenzs/:id - Modifier un post
* DELETE /post-frenzs/:id - Supprimer un post

Commentaires
* GET /comments-frenzs - Liste des commentaires
* POST /comments-frenzs - Créer un commentaire
* PUT /comments-frenzs/:id - Modifier un commentaire
* DELETE /comments-frenzs/:id - Supprimer un commentaire

Utilisateurs
* GET /users/me - Profil utilisateur
* PUT /users/:id - Modifier le profil

🎨 Thématiques disponibles
* Général 🔵
* Game 🟢
* Sport 🔴
* Culture 🟣
* Technologie 🟡
* Santé 🩷
* Environnement 🔵
* Éducation 🟠

📱 Responsive Design
L'application est entièrement responsive et s'adapte à tous les écrans :
* Desktop (1200px+)
* Tablet (768px - 1199px)

📄 Licence
Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.

👥 Équipe
Développé avec ❤️ par l'équipe Frenz dans le cadre d'un projet d'études.

Nana CHEN
Ava MOUSAVI
Kevin JOVENÉ
Thomas MARCHESCHI


Note: Ce projet a été développé à des fins éducatives dans le cadre du cursus Data/Web.
