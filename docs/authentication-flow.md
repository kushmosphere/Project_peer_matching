# Authentication And Verification Flow

## Signup Inputs

- College email address
- USN
- Phone number
- OTP code
- Basic consent and policy acceptance

## Rules

- Reject public email domains such as `gmail.com`, `yahoo.com`, `outlook.com`, `hotmail.com`, `icloud.com`, and `proton.me`.
- Allow only domains present in the `colleges.allowedEmailDomains` array.
- USN must match an active student record for the same college.
- Phone number must be verified by Firebase Auth OTP before the backend issues an app session.
- A user cannot complete onboarding until `verification.status` is `verified`.

## Flow

1. User enters college email, USN, and phone number.
2. Backend normalizes email and USN.
3. Backend checks the email domain against supported college domains.
4. Backend checks the USN against college-imported student records.
5. Firebase sends phone OTP.
6. Client submits Firebase ID token after OTP verification.
7. Backend verifies Firebase ID token through Firebase Admin SDK.
8. Backend links Firebase UID to the student record.
9. Backend creates or updates the user profile from college data.
10. Backend returns an app JWT with role, college ID, and verification status.

## JWT Claims

```json
{
  "sub": "user_id",
  "collegeId": "college_id",
  "role": "student",
  "verificationStatus": "verified",
  "iat": 1780000000,
  "exp": 1780086400
}
```

## Verification States

- `pending_email`: email domain accepted but email link not confirmed.
- `pending_phone`: phone OTP not verified.
- `pending_admin`: record matched but admin review is required.
- `verified`: user can access the app.
- `rejected`: user cannot access the app.
- `banned`: user account is blocked.

