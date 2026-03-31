# La Cosmetica V2

Application complete pour la gestion d'une pharmacie cosmetique, composee de:
- un backend API REST en Laravel 12
- un frontend client en Nuxt 4 (Vue 3)

Le projet permet l'authentification JWT, la consultation de produits par slug, la gestion de commandes, et des operations selon le role (client, employe, admin).

## Table des matieres

- [Vision du projet](#vision-du-projet)
- [Architecture](#architecture)
- [Stack technique](#stack-technique)
- [Fonctionnalites](#fonctionnalites)
- [Installation rapide](#installation-rapide)
- [Configuration](#configuration)
- [Lancer le projet](#lancer-le-projet)
- [API et endpoints](#api-et-endpoints)
- [Tests et qualite](#tests-et-qualite)
- [Postman et Swagger](#postman-et-swagger)
- [Structure du repository](#structure-du-repository)
- [Etat actuel et ameliorations](#etat-actuel-et-ameliorations)

## Vision du projet

Suite a la realisation de l'API La Cosmetica, cette V2 introduit une application frontend moderne pour:
- visualiser les produits cosmetiques
- gerer l'authentification utilisateur
- passer et suivre des commandes
- administrer categories/produits
- superviser les commandes et statistiques selon les roles

Objectif principal:
Developper une application intuitive et conviviale qui exploite l'API La Cosmetica V2 pour suivre, visualiser et gerer les produits cosmetiques efficacement.

## Architecture

- Frontend: Nuxt 4 en mode SPA (SSR desactive)
- Backend: Laravel 12 expose des routes API sous `/api`
- Authentification: JWT via `php-open-source-saver/jwt-auth`
- Base de donnees: PostgreSQL
- Pattern data access: DAO pour le domaine Produit
- DTO: `LoginDTO`, `RegisterDTO`

Flux global:
1. L'utilisateur se connecte/s'inscrit via frontend.
2. Le backend retourne un token JWT.
3. Le frontend stocke le token en cookie (`auth_token`).
4. Les requetes protegees incluent le token Bearer.

## Stack technique

### Backend

- PHP 8.2+
- Laravel 12
- PostgreSQL
- JWT Auth (`php-open-source-saver/jwt-auth`)
- Spatie Sluggable
- Spatie Data
- L5 Swagger
- Pest (tests)

### Frontend

- Nuxt 4
- Vue 3
- Tailwind CSS

## Fonctionnalites

### Cote client

- Inscription et connexion JWT
- Consultation des produits disponibles
- Consultation d'un produit via son slug (`/api/products/{slug}`)
- Creation de commande avec produits par slug et quantite
- Consultation de ses commandes
- Annulation d'une commande tant qu'elle est `pending`

### Cote employe

- Passage d'une commande de `pending` vers `preparing`
- Passage d'une commande de `preparing` vers `delivered`

### Cote administrateur

- CRUD categories
- CRUD produits
- Consultation des statistiques ventes/produits/categories

### Contraintes metier implementees

- Slug produit gere via Spatie Sluggable
- Limite de 4 images max par produit (validation backend)
- Message d'erreur dedie si depassement de limite:
  - `Limite de 4 images par produit depassee`
- Gestion des erreurs API avec codes HTTP adaptes (401, 403, 404, 422...)

## Installation rapide

Prerequis:
- PHP >= 8.2
- Composer
- Node.js >= 18
- npm
- PostgreSQL

### 1) Backend

```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
```

Configurer la base dans `.env`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=app
DB_USERNAME=root
DB_PASSWORD=
```

Puis lancer migrations + seed:

```bash
php artisan migrate --seed
```

### 2) Frontend

```bash
cd frontend
npm install
```

## Configuration

### URL API cote frontend

Le frontend pointe par defaut vers:

- `http://127.0.0.1:8000/api`

Valeur definie dans `frontend/nuxt.config.ts`:

```ts
runtimeConfig: {
  public: {
    apiBase: 'http://127.0.0.1:8000/api'
  }
}
```

## Lancer le projet

Ouvrir 2 terminaux:

### Terminal 1 (backend)

```bash
cd backend
php artisan serve
```

API disponible sur:
- `http://127.0.0.1:8000`

### Terminal 2 (frontend)

```bash
cd frontend
npm run dev
```

Frontend disponible sur:
- `http://localhost:3000`

## API et endpoints

Base URL:
- `http://127.0.0.1:8000/api`

### Auth

- `POST /register`
- `POST /login`
- `GET /me` (auth)
- `POST /logout` (auth)

### Produits publics

- `GET /products`
- `GET /products/{slug}`

### Commandes client (auth)

- `POST /orders`
- `GET /orders`
- `GET /orders/{orderid}`
- `POST /orders/cancel/{cancleid}`

### Operations employe (role: employee)

- `PUT /employee/orders/{id}/prepare`
- `PUT /employee/orders/{id}/deliver`

### Operations admin (role: admin)

- `GET /admin/stats`
- `GET /admin/categories`
- `POST /admin/categories`
- `PUT /admin/categories/{id}`
- `DELETE /admin/categories/{id}`
- `GET /admin/products`
- `POST /admin/products`
- `PUT /admin/products/{id}`
- `DELETE /admin/products/{id}`

### Exemple payload create order

```json
{
  "products": [
    {
      "slug": "cream-hydratante-bio",
      "quantity": 2
    }
  ]
}
```

### Exemple payload create product (admin)

```json
{
  "category_id": 1,
  "name": "Hydrating Serum",
  "description": "A daily hydrating serum.",
  "price": 39.99,
  "stock": 100,
  "images": [
    "https://example.com/images/serum-1.jpg",
    "https://example.com/images/serum-2.jpg"
  ]
}
```

## Tests et qualite

Backend teste avec Pest.

Commandes utiles:

```bash
cd backend
php artisan test
```

Couverts actuellement (Feature):
- Authentification (register, login, logout)
- Categories admin (creation, update, delete, controle acces)
- Recuperation produit par slug + cas 404

## Postman et Swagger

### Postman

Collection incluse:
- `backend/postman/LaCosmetica-API.postman_collection.json`
- `backend/postman/LaCosmetica-Local.postman_environment.json`

Elle couvre auth, produits, commandes, employe et admin.

### Swagger

Le package L5 Swagger est installe.

Generer la doc:

```bash
cd backend
php artisan l5-swagger:generate
```

Acceder a l'UI:
- `http://127.0.0.1:8000/api/documentation`

## Structure du repository

```text
LaCosmeticaV2/
├── backend/   # API Laravel + tests + Postman
└── frontend/  # Application Nuxt (Vue)
```

## Etat actuel et ameliorations

Etat actuel:
- Le backend expose les endpoints principaux demandes dans le brief.
- Le frontend couvre deja login/register + listing produits + detail produit.
- Le dashboard frontend est present mais reste minimal.

Ameliorations recommandees:
- Finaliser l'UX commande cote frontend (creation/suivi/annulation)
- Brancher les vues employee/admin dans le frontend
- Ajouter des tests backend sur commandes et statistiques
- Ajouter tests frontend (Vitest/Cypress)
- Renforcer la gestion globale des erreurs et messages utilisateurs

---

Projet realise dans le cadre de la formation Developpeur Web et Web Mobile.