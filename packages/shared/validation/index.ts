import { z } from 'zod';
import type { Locale } from '../i18n';
import { loadLocaleJson } from '../i18n';

export async function getLoginSchema(locale: Locale) {
  const dict = await loadLocaleJson(locale, 'login');
  return z.object({
    email: z
      .string()
      .nonempty(dict.required)
      .email(dict.invalid_email),
    password: z
      .string()
      .nonempty(dict.required)
      .min(6, dict.password_min),
  });
}

export async function getRegisterSchema(locale: Locale) {
  const dict = await loadLocaleJson(locale, 'login'); // ili 'register' ako postoji posebna
  return z.object({
    email: z
      .string()
      .nonempty(dict.required)
      .email(dict.invalid_email),
    password: z
      .string()
      .nonempty(dict.required)
      .min(6, dict.password_min),
  });
}
