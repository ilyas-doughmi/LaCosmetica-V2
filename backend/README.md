# La Cosmetica V2 - Backend API

Backend REST construit avec Laravel 12 pour la gestion des utilisateurs, produits, commandes et operations staff/admin de La Cosmetica.

## Stack

- PHP 8.2+
- Laravel 12
- PostgreSQL
- JWT (`php-open-source-saver/jwt-auth`)
- Spatie Sluggable
- Spatie Data
- L5 Swagger
- Pest

## Fonctionnalites

- Authentification JWT: register, login, me, logout
- Produits publics: liste et detail par slug
- Commandes client: creation, listing, detail, annulation
- Operations employe: preparation et livraison des commandes
- Operations admin: CRUD categories, CRUD produits, statistiques
- Validation metier: maximum 4 images par produit

## Installation

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
```

Configurer la base PostgreSQL dans `.env` puis lancer:

```bash
php artisan migrate --seed
```

Demarrer le serveur:

```bash
php artisan serve
```

API locale:
- http://127.0.0.1:8000/api

## Endpoints principaux

### Public

- `POST /api/register`
- `POST /api/login`
- `GET /api/products`
- `GET /api/products/{slug}`

### Auth client

- `GET /api/me`
- `POST /api/logout`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/{orderid}`
- `POST /api/orders/cancel/{cancleid}`

### Role employe

- `PUT /api/employee/orders/{id}/prepare`
- `PUT /api/employee/orders/{id}/deliver`

### Role admin

- `GET /api/admin/stats`
- `GET /api/admin/categories`
- `POST /api/admin/categories`
- `PUT /api/admin/categories/{id}`
- `DELETE /api/admin/categories/{id}`
- `GET /api/admin/products`
- `POST /api/admin/products`
- `PUT /api/admin/products/{id}`
- `DELETE /api/admin/products/{id}`

## Validation et erreurs

- Reponses JSON avec codes HTTP standards (200, 201, 400, 401, 403, 404, 422)
- Validation des payloads via Form Requests
- Message dedie si plus de 4 images produit:
	- `Limite de 4 images par produit depassee`

## Tests

Executer les tests:

```bash
php artisan test
```

Tests feature existants:
- Auth
- Categories admin
- Produits par slug

## Documentation API

### Postman

Collection:
- `postman/LaCosmetica-API.postman_collection.json`

Environment:
- `postman/LaCosmetica-Local.postman_environment.json`

### Swagger

Generer la documentation:

```bash
php artisan l5-swagger:generate
```

Interface:
- http://127.0.0.1:8000/api/documentation

## Notes

- Le role est controle par le middleware `role` (ex: `role:admin`, `role:employee`).
- Le pattern DAO est applique au domaine Produit (`ProductDAOInterface`, `ProductDAO`).
