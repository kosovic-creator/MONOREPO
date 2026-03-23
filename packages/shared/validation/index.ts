import { z } from 'zod';
import type { Locale } from '../i18n';

const messages = {
  en: {
    email: 'Invalid email address',
    required: 'This field is required',
    passwordMin: 'Password must be at least 6 characters',
  },
  sr: {
    email: 'Neispravna email adresa',
    required: 'Polje je obavezno',
    passwordMin: 'Lozinka mora imati najmanje 6 karaktera',
  },
};


export function getLoginSchema(locale: Locale) {
  return z.object({
    email: z
      .string()
      .nonempty(messages[locale].required)
      .email(messages[locale].email),
    password: z
      .string()
      .nonempty(messages[locale].required)
      .min(6, messages[locale].passwordMin),
  });
}


export function getRegisterSchema(locale: Locale) {
  return z.object({
    email: z
      .string()
      .nonempty(messages[locale].required)
      .email(messages[locale].email),
    password: z
      .string()
      .nonempty(messages[locale].required)
      .min(6, messages[locale].passwordMin),
  });
}
