# Self Checks — Site vitrine

Site marketing React/Vite pour Self Checks : présentation, offres, paiement Stripe et activation des comptes via l'API PHP (AlwaysData).

## Prérequis

- Node.js 18+
- Compte [Stripe](https://stripe.com) (clés + prix + webhook)
- Compte [Resend](https://resend.com) pour les emails
- Hébergement [Vercel](https://vercel.com) pour le front et les fonctions `/api`
- API PHP déployée sur AlwaysData (`api_receive_paid_token.php`)

## Installation locale

```bash
npm install
cd api && npm install && cd ..
cp .env.example .env
# Renseigner les variables dans .env
npm run dev
```

Le site est disponible sur `http://localhost:5173`.

## Variables d'environnement

Copier `.env.example` vers `.env` (local) et configurer les **mêmes variables** dans le tableau de bord Vercel (Production + Preview).

| Variable | Où | Rôle |
|----------|-----|------|
| `VITE_PRICE_*` | Frontend | IDs de prix Stripe affichés sur `/offres` |
| `STRIPE_PRICE_*` | API | Whitelist des prix acceptés au checkout (mêmes valeurs que `VITE_PRICE_*`) |
| `STRIPE_SECRET_KEY` | API | Appels Stripe serveur |
| `STRIPE_WEBHOOK_SECRET` | API | Signature du webhook `checkout.session.completed` |
| `RESEND_API_KEY` | API | Envoi des emails (contact + confirmation paiement) |
| `PHP_API_SECRET` | API + PHP | Bearer token partagé avec AlwaysData |
| `SITE_URL` | API | URL du site vitrine (lien résiliation dans les emails) |
| `APP_URL` | API | URL de l'application Self Checks |

Sur AlwaysData, définir `PHP_API_SECRET` dans les variables d'environnement PHP et adapter les identifiants MySQL dans `api_receive_paid_token.php`.

## Déploiement Vercel

1. Importer le dépôt Git sur Vercel.
2. Framework : **Vite** — commande build : `npm run build`, sortie : `dist`.
3. Ajouter toutes les variables d'environnement listées ci-dessus.
4. Déployer.

Les routes `/api/*` sont servies par les fonctions dans le dossier `api/`.

## Webhook Stripe

Après déploiement, dans le [tableau de bord Stripe](https://dashboard.stripe.com/webhooks) :

1. **Ajouter un endpoint** : `https://votre-domaine.vercel.app/api/stripe-webhook`
2. Événement : `checkout.session.completed`
3. Copier le **Signing secret** dans `STRIPE_WEBHOOK_SECRET` sur Vercel.

Le webhook crée le token et synchronise la BDD même si l'utilisateur ne charge pas `/success`. La page succès reste utile pour afficher le token immédiatement.

## Flux paiement

1. L'utilisateur choisit une offre sur `/offres` → `POST /api/create-checkout-session`
2. Redirection Stripe Checkout
3. En parallèle :
   - Webhook `checkout.session.completed` → token + PHP + email
   - Retour navigateur `/success?session_id=...` → même logique (idempotente)

## Scripts

| Commande | Description |
|----------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build production |
| `npm run preview` | Prévisualiser le build |
| `npm run lint` | ESLint |

## Structure

```
src/          # React (pages, composants)
api/          # Fonctions serverless Vercel (Stripe, Resend, webhook)
public/       # Assets statiques
```
