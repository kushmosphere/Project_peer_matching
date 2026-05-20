# CampusCircle

A private college-only social ecosystem that blends Instagram-style campus posts, Bumble-style matching, communities, and verified student identity.

## What Is Included

- Mobile-first landing page and app screen prototype in `frontend/`
- Node.js + Express backend architecture skeleton in `backend/`
- MongoDB schema design in `docs/database-schema.md`
- REST and realtime API structure in `docs/api-structure.md`
- Student verification and authentication flow in `docs/authentication-flow.md`
- Product design system and screen list in `docs/ui-screens.md`
- Deployment steps in `docs/deployment.md`
- App name ideas in `docs/app-name-ideas.md`

## Suggested Stack

- Frontend app: React Native or Flutter
- Demo/landing prototype: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB Atlas
- Auth: Firebase Auth phone OTP + backend JWT
- Storage: Cloudinary or Firebase Storage
- Realtime: Socket.io
- AI: moderation and recommendations through background jobs

## Run The Prototype

Open `frontend/index.html` in a browser.

The prototype is static and works without a dev server.

## Backend Skeleton

The backend folder contains a production-oriented Express structure with routes, middleware, controllers, and Mongoose models. It is intentionally lightweight so you can wire environment variables and providers according to your preferred Firebase, MongoDB, Cloudinary, and AI moderation setup.

## MVP Scope

1. Student-only signup with college email, USN, and phone OTP.
2. Verified profile generated from college records.
3. Feed with posts, likes, comments, hashtags, and trending.
4. Swipe-based connect mode for friends, study partners, and optional dating.
5. Realtime chat with typing, read receipts, and media.
6. Communities for clubs, events, hackathons, placements, lost and found, and notes.
7. Admin dashboard for verification, moderation, bans, and event management.

