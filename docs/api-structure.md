# API Structure

All protected routes require `Authorization: Bearer <jwt>`. Every student route must enforce `collegeId` isolation from the JWT.

## Auth

- `POST /api/auth/precheck`
  - Validates college email domain and USN.
- `POST /api/auth/firebase-session`
  - Accepts Firebase ID token after phone OTP.
  - Returns app JWT and profile.
- `POST /api/auth/logout`
  - Revokes session token.

## Profile

- `GET /api/me`
- `PATCH /api/me`
- `PATCH /api/me/privacy`
- `POST /api/me/profile-picture`

## Feed

- `GET /api/feed?cursor=...`
- `POST /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts/:id/like`
- `DELETE /api/posts/:id/like`
- `POST /api/posts/:id/comments`
- `GET /api/trending`

## Match

- `GET /api/match/deck?mode=study`
- `POST /api/match/swipes`
- `GET /api/match/matches`
- `PATCH /api/match/preferences`

## Chat

- `GET /api/conversations`
- `POST /api/conversations`
- `GET /api/conversations/:id/messages`
- `POST /api/conversations/:id/messages`
- `POST /api/conversations/:id/media`

## Communities

- `GET /api/communities`
- `POST /api/communities`
- `GET /api/communities/:id`
- `POST /api/communities/:id/join`
- `POST /api/communities/:id/posts`

## Admin

- `GET /api/admin/verifications`
- `PATCH /api/admin/users/:id/verify`
- `PATCH /api/admin/users/:id/ban`
- `GET /api/admin/reports`
- `PATCH /api/admin/reports/:id`
- `POST /api/admin/events`

## Socket.io Events

Client emits:

- `conversation:join`
- `message:send`
- `typing:start`
- `typing:stop`
- `message:seen`

Server emits:

- `message:new`
- `typing:update`
- `message:seen`
- `match:new`
- `post:moderation_update`

