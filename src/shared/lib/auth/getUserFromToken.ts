// src/shared/lib/auth/getUserFromToken.ts
import { jwtDecode } from 'jwt-decode';
import { AUTH_KEYS } from '../../config/storage';

export type DecodedToken = {
  userId: number;
  iat: number;
  exp: number;
};

export function getUserFromToken(): DecodedToken | null {
  const token = localStorage.getItem(AUTH_KEYS.accessToken);
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);

    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem(AUTH_KEYS.accessToken);
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}
