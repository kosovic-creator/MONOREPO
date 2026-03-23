// Centralized i18n config and helpers for monorepo
import { createContext, useContext } from 'react';
import { setLocaleCookie } from './cookie';

export type Locale = 'en' | 'sr';

export const locales: Record<Locale, string> = {
  en: 'English',
  sr: 'Srpski',
};

export const defaultLocale: Locale = 'en';

export const I18nContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>({
  locale: defaultLocale,
  setLocale: () => {},
});

export function useI18n() {
  return useContext(I18nContext);
}

// Simple translation dictionary
export const translations: Record<Locale, Record<string, string>> = {
  en: {
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    language: 'Language',
    home: 'Home',
    logout: 'Logout',
    name: 'Name',
    user: 'User',
    admin: 'Admin',
    invalid_login: 'Invalid email or password',
    register_success: 'Registration successful! Please log in.',
    register_error: 'Registration failed',
    error: 'An error occurred',
  },
  sr: {
    login: 'Prijava',
    register: 'Registracija',
    email: 'Email',
    password: 'Lozinka',
    language: 'Jezik',
    home: 'Početna',
    logout: 'Odjava',
    name: 'Ime',
    user: 'Korisnik',
    admin: 'Admin',
    invalid_login: 'Pogrešan email ili lozinka',
    register_success: 'Registracija uspješna! Prijavite se.',
    register_error: 'Greška pri registraciji',
    error: 'Došlo je do greške',
  },
};

export function t(locale: Locale, key: string): string {
  return translations[locale][key] || key;
}

export { setLocaleCookie };
