const COOKIE_NAME = 'locale';

export function setLocaleCookie(locale: string) {
  // This function is for client-side usage
  document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=31536000`;
}
