/**
 * Contact-form validation shared by the browser (instant feedback)
 * and the /api/contact route (never trust the client).
 */
export const LIMITS = { name: 80, email: 254, message: 2000 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input = {}) {
  const values = {
    // Newlines are stripped from the name because it ends up in an email subject.
    name: String(input.name ?? '').replace(/[\r\n]+/g, ' ').trim(),
    email: String(input.email ?? '').trim(),
    message: String(input.message ?? '').trim(),
  };

  const errors = {};

  if (!values.name) errors.name = 'Please enter your name.';
  else if (values.name.length < 2) errors.name = 'Name should be at least 2 characters.';
  else if (values.name.length > LIMITS.name) errors.name = `Name should be under ${LIMITS.name} characters.`;

  if (!values.email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(values.email) || values.email.length > LIMITS.email)
    errors.email = 'Please enter a valid email address, like name@example.com.';

  if (!values.message) errors.message = 'Please write a message.';
  else if (values.message.length < 10) errors.message = 'Message should be at least 10 characters.';
  else if (values.message.length > LIMITS.message)
    errors.message = `Message should be under ${LIMITS.message} characters.`;

  return { values, errors };
}

/** Build a mailto: link from form values — used when the server can't send email. */
export function buildMailto(to, { name, email, message }) {
  const subject = `Portfolio enquiry from ${name}`;
  const body = `${message}\n\n— ${name}\n${email}`;
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
