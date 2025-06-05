# API RESTful - Films, Commentaires, Utilisateurs & Catégories

Une API RESTful en **Node.js / TypeScript** avec **Express**, **Drizzle**, **Zod** et **PostgreSQL** pour gérer des films, leurs catégories, les commentaires des utilisateurs, et l’authentification.

---

## 🔧 Stack utilisée

- **TypeScript**
- **Express**
- **Drizzle** (avec PostgreSQL)
- **Zod** (validation des données)
- **JWT** (authentification)
- **dotenv**
- **argon2** (hash de mot de passe)
- **Winston** (logger)
- **ts-node-dev** / **tsx** (développement)

---

## 📁 Structure de projet

```
.
├── src
│   ├── config          # Configuration Drizzle, DB, .env
│   ├── controllers     # Logique métier des routes
│   ├── entities        # Types/Interfaces Zod & TS
│   ├── middlewares     # Auth / validation / erreurs
│   ├── models          # Accès DB via Drizzle
│   ├── routes          # Routes express
│   ├── schemas         # Schémas drizzle
│   ├── utils           # Logger, réponse API, hash password
│   └── server.ts       # Point d'entrée de l'application
├── .env
├── tsconfig.json
├── package.json
└── README.md
```

---

## ▶️ Scripts disponibles

| Commande           | Description                                               |
|--------------------|-----------------------------------------------------------|
| `npm run dev`      | Lancer le serveur en mode développement                   |
| `npm start`        | Lancer le serveur compilé (`dist/server.js`)              |
| `npm run generate` | Générer les fichiers avec Drizzle                         |
| `npm run migrate`  | Appliquer une migration avec tsx                          |
| `npm run studio`   | Lancer l'interface graphique Drizzle Studio               |

---

## 📦 Dépendances installées

### Principales :

- `express`
- `drizzle-orm`
- `postgres`
- `pg`
- `zod`
- `argon2`
- `jsonwebtoken`
- `dotenv`
- `cookie-parser`
- `cors`
- `winston`

### Dépendances de développement :

- `typescript`
- `ts-node`
- `ts-node-dev`
- `tsx`
- `drizzle-kit`
- `concurrently`
- `@types/express`
- `@types/node`
- `@types/jsonwebtoken`
- `@types/cors`
- `@types/pg`
- `@types/cookie-parser`

---

## 🌐 Lancer en développement

```bash
npm run dev
```

---

## 🧪 Exemples de routes

### Auth
- `POST /register`
- `POST /login`

### Users
- `GET /users`
- `GET /users/:id`

### Movies
- `GET /movies`
- `POST /movies`

### Comments
- `GET /comments`
- `POST /comments`

---

### 🛠️ Outils recommandés

- **Postman** pour tester les routes
- **Drizzle Studio** pour visualiser la base de données

---