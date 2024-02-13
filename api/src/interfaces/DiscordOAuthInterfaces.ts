export type DiscordOAuthRequest = {
  code: string;
  client_id: string;
  client_secret: string;
  redirect_uri: string;
  grant_type: 'authorization_code' | 'refresh_token';
};

export type DiscordOAuthRefreshRequest = {
  refresh_token: string;
  client_id: string;
  client_secret: string;
  grant_type: 'refresh_token';
};

export type DiscordOAuthCode = {
  code: string;
};

export interface DiscordTokenResponse {
  access_token: string;
  token_type: 'Bearer';
  expires_in: number;
  refresh_token: string;
  scope: string;
  jwt_token: string;
}

export interface JwtToken {
  access_token: string;
  permissions: string[];
}

export interface RefreshTokenRequest {
  refresh_token: string;
  grant_type: 'refresh_token';
}
