// Shared shapes for third-party auth users surfaced in the UI.

export interface GoogleUser {
  name: string;
  email: string;
  picture?: string;
}

export interface TwitterUser {
  username: string;
  name?: string;
  profile_image_url?: string;
}
