# Database Schema

MongoDB is a good fit because the app has social objects, flexible profile fields, posts, comments, communities, and chat documents.

## College

```js
{
  _id,
  name,
  shortName,
  allowedEmailDomains: ["rvce.edu.in"],
  location,
  verificationMode: "database_match",
  createdAt,
  updatedAt
}
```

## StudentRecord

Imported by college admins before student signup.

```js
{
  _id,
  collegeId,
  usn,
  fullName,
  department,
  semester,
  section,
  officialEmail,
  phoneHash,
  status: "active",
  createdAt,
  updatedAt
}
```

## User

```js
{
  _id,
  collegeId,
  studentRecordId,
  firebaseUid,
  fullName,
  email,
  phoneHash,
  usn,
  department,
  semester,
  section,
  profilePictureUrl,
  bio,
  interests: ["AI", "Cricket", "Hackathons"],
  clubs: ["Robotics"],
  privacy: {
    showUsn: false,
    datingEnabled: false,
    antiScreenshotChat: true
  },
  verification: {
    status: "verified",
    verifiedAt,
    method: "email_usn_phone"
  },
  role: "student",
  createdAt,
  updatedAt
}
```

## Post

```js
{
  _id,
  collegeId,
  authorId,
  media: [{ type: "image", url, thumbnailUrl, publicId }],
  caption,
  hashtags: ["hackathon", "cse"],
  likeCount,
  commentCount,
  shareCount,
  moderation: {
    status: "approved",
    score: 0.03,
    labels: []
  },
  visibility: "college",
  createdAt,
  updatedAt
}
```

## Comment

```js
{
  _id,
  postId,
  authorId,
  body,
  moderation,
  createdAt,
  updatedAt
}
```

## MatchPreference

```js
{
  _id,
  userId,
  mode: "study",
  enabled: true,
  departments,
  semesters,
  interests,
  clubs,
  datingOptInRequired: true,
  updatedAt
}
```

## Swipe

```js
{
  _id,
  collegeId,
  fromUserId,
  toUserId,
  mode: "friends",
  action: "like",
  createdAt
}
```

## Match

```js
{
  _id,
  collegeId,
  users: [userA, userB],
  mode: "study",
  score,
  status: "active",
  createdAt
}
```

## Conversation

```js
{
  _id,
  collegeId,
  type: "private",
  participantIds,
  title,
  encryption: {
    enabled: true,
    keyVersion: 1
  },
  lastMessageAt,
  createdAt,
  updatedAt
}
```

## Message

```js
{
  _id,
  conversationId,
  senderId,
  encryptedBody,
  media,
  voiceNoteUrl,
  seenBy: [{ userId, seenAt }],
  createdAt
}
```

## Community

```js
{
  _id,
  collegeId,
  type: "club",
  name,
  description,
  coverUrl,
  memberIds,
  adminIds,
  createdAt,
  updatedAt
}
```

## Report

```js
{
  _id,
  collegeId,
  reporterId,
  targetType: "post",
  targetId,
  reason,
  status: "open",
  adminNotes,
  createdAt,
  updatedAt
}
```

