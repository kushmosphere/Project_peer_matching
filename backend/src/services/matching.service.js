export function scoreStudentMatch(currentUser, candidate, mode = "friends") {
  let score = 0;

  if (currentUser.department === candidate.department) score += 20;
  if (currentUser.semester === candidate.semester) score += 20;

  const sharedInterests = (currentUser.interests || []).filter((interest) =>
    (candidate.interests || []).includes(interest)
  );
  const sharedClubs = (currentUser.clubs || []).filter((club) => (candidate.clubs || []).includes(club));

  score += sharedInterests.length * 10;
  score += sharedClubs.length * 15;

  if (mode === "study" && currentUser.semester === candidate.semester) score += 15;
  if (mode === "dating" && (!currentUser.privacy?.datingEnabled || !candidate.privacy?.datingEnabled)) return 0;

  return Math.min(score, 100);
}

