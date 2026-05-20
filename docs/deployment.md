# Deployment Steps

## Frontend

For a React Native app:

1. Create the app with Expo or React Native CLI.
2. Add Firebase Auth for phone OTP.
3. Store API base URL in environment config.
4. Build Android and iOS releases.
5. Publish internal beta builds to TestFlight and Google Play Internal Testing.

## Backend

1. Create MongoDB Atlas cluster.
2. Create Firebase project and enable phone authentication.
3. Create Cloudinary or Firebase Storage bucket.
4. Configure environment variables.
5. Deploy Express API to Render, Railway, Fly.io, AWS ECS, or Google Cloud Run.
6. Deploy Socket.io on a provider that supports WebSockets.
7. Configure HTTPS and CORS for mobile clients.

## Environment Variables

```bash
PORT=8080
MONGODB_URI=mongodb+srv://...
JWT_SECRET=replace-with-strong-secret
FIREBASE_PROJECT_ID=...
FIREBASE_CLIENT_EMAIL=...
FIREBASE_PRIVATE_KEY=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
ALLOWED_PUBLIC_EMAIL_DOMAINS=gmail.com,yahoo.com,outlook.com,hotmail.com,icloud.com
```

## Production Checklist

- Enforce college ID on every query.
- Rate-limit auth and OTP endpoints.
- Store phone numbers as hashes where possible.
- Run AI moderation before publishing user content.
- Add human moderation for appealed content.
- Encrypt chat payloads before storage.
- Keep admin routes behind role checks and audit logs.
- Use crash reporting and analytics for mobile builds.

