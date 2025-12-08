export type ContactFormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

export const CONTACT_HONEYPOT_FIELD = "company_website";
export const MIN_FILL_TIME_MS = 800;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+()\d][\d\s().+-]{6,}$/;

const REQUIRED_MESSAGE = "This field is required";

export const sanitizeField = (value: string) => value.trim();

export function normalizeFormValues(values: ContactFormValues): ContactFormValues {
  return {
    ...values,
    name: sanitizeField(values.name),
    email: sanitizeField(values.email).toLowerCase(),
    phone: sanitizeField(values.phone),
    message: values.message.trim(),
  };
}

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name || !values.name.trim()) {
    errors.name = REQUIRED_MESSAGE;
  }

  if (!values.email || !values.email.trim()) {
    errors.email = REQUIRED_MESSAGE;
  } else if (!EMAIL_REGEX.test(values.email.trim())) {
    errors.email = "Enter a valid email";
  }

  if (!values.phone || !values.phone.trim()) {
    errors.phone = REQUIRED_MESSAGE;
  } else if (!PHONE_REGEX.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number";
  }

  if (!values.message || !values.message.trim()) {
    errors.message = REQUIRED_MESSAGE;
  } else if (values.message.trim().length < 5) {
    errors.message = "Enter a valid message";
  }

  return errors;
}

export const hasContactFormErrors = (errors: ContactFormErrors) =>
  Object.values(errors).some(Boolean);
