export const MONGODB_URI = process.env.MONGODB_URI || "";
export const DEFAULT_CARD_COLOR = "#000000";

export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "";
export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET || "";
export const NEXT_PUBLIC_SECRET = process.env.NEXT_PUBLIC_SECRET || "";
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL || "";
export const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "";
export const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "";

export const SPOTIFY_AUTH_SCOPES = [
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-follow-read",
  "playlist-read-private",
  "user-read-email",
  "user-read-private",
  "user-library-read",
  "playlist-read-collaborative",
];
