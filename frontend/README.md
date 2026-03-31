# La Cosmetica V2 - Frontend

Application frontend Nuxt 4 (Vue 3) qui consomme l'API La Cosmetica V2.

## Stack

- Nuxt 4
- Vue 3
- Tailwind CSS

## Pages disponibles

- `/` : page d'accueil
- `/login` : connexion utilisateur
- `/register` : inscription utilisateur
- `/products` : liste des produits
- `/products/[slug]` : detail d'un produit
- `/dashboard` : ecran dashboard (structure initiale)

## Authentification

- Le token JWT recu apres login/register est stocke dans un cookie `auth_token`.
- Un middleware `auth` est present pour proteger des pages privees.

## Installation

```bash
npm install
```

## Lancer en developpement

```bash
npm run dev
```

Application locale:
- http://localhost:3000

## Build production

```bash
npm run build
npm run preview
```

## Configuration API

Le frontend utilise `runtimeConfig.public.apiBase`:

```ts
runtimeConfig: {
	public: {
		apiBase: 'http://127.0.0.1:8000/api'
	}
}
```

Fichier:
- `nuxt.config.ts`

Assure-toi que le backend Laravel tourne sur la meme URL/port, ou adapte la valeur.

## Scripts npm

- `npm run dev` : demarrage local
- `npm run build` : build production
- `npm run generate` : generation statique
- `npm run preview` : preview du build

## Etat actuel

Deja implemente:
- UI login/register
- listing produits
- detail produit par slug

A completer:
- experience commande complete (panier, confirmation, suivi)
- sections employee/admin cote frontend
- protection des pages privees via `definePageMeta({ middleware: 'auth' })` la ou necessaire
