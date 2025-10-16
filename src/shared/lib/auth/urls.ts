import { ROUTES } from '@/src/shared/config/routes';

const googleOAuthBaseUrl = process.env.NEXT_PUBLIC_GOOGLE_OAUTH_BASE_URL;
const googleScope = process.env.NEXT_PUBLIC_GOOGLE_SCOPE;
const googleRedirectUrl = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL;
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
const appUrl = process.env.NEXT_PUBLIC_APP_URL;

if (!googleOAuthBaseUrl || !googleScope || !googleRedirectUrl || !googleClientId) {
  throw new Error('Missing required environment variables for Google OAuth');
}

if (!baseUrl || !appUrl) {
  throw new Error('Missing required environment variables for GitHub OAuth');
}

export const googleOAuthUrl = `${googleOAuthBaseUrl}?scope=${encodeURIComponent(googleScope)}&response_type=code&redirect_uri=${encodeURIComponent(googleRedirectUrl)}&client_id=${encodeURIComponent(googleClientId)}`;

export const gitHubOAuthUrl = `${baseUrl}${ROUTES.AUTH.GITHUB_AUTHORIZATION}?redirect_url=${encodeURIComponent(appUrl)}${ROUTES.AUTH.GET_TOKEN_GITHUB_OAUTH}`;
