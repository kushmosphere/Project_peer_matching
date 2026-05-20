const defaultPublicDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com", "proton.me"];

export function getEmailDomain(email) {
  return email.trim().toLowerCase().split("@").at(-1);
}

export function isPublicEmail(email) {
  const configured = process.env.PUBLIC_EMAIL_DOMAINS?.split(",").map((domain) => domain.trim().toLowerCase());
  const publicDomains = configured?.length ? configured : defaultPublicDomains;

  return publicDomains.includes(getEmailDomain(email));
}

