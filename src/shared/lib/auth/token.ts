import { AUTH_KEYS } from '@/src/shared/config/storage';

export const AUTH_CHANGE_EVENT = 'auth:changed';

export function saveAccessToken(token: string) {
  localStorage.setItem(AUTH_KEYS.accessToken, token);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function clearAccessToken() {
  localStorage.removeItem(AUTH_KEYS.accessToken);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function getAccessToken() {
  return localStorage.getItem(AUTH_KEYS.accessToken);
}
