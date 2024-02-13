import { config } from '../config';
import { DiscordUser } from '../interfaces/DiscordUser';
import { JwtAuthorization } from '../interfaces/JwtAuthorization';

export default class DiscordAuthenticatorService {
  private refreshTokenAttemptsCounter: number = 0;
  private accessToken: string = '';
  private refreshToken: string = '';

  public parseJwt(token: string): JwtAuthorization {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    return JSON.parse(jsonPayload);
  }

  private async fetchWithAuth(
    url: string,
    options: RequestInit = {},
    attemptRefresh: boolean = true
  ): Promise<Response> {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (
      response.status === 401 &&
      attemptRefresh &&
      this.refreshToken &&
      this.refreshTokenAttemptsCounter < config.REFRESH_TOKEN_MAX_ATTEMPTS
    ) {
      this.refreshTokenAttemptsCounter++;
      await this.refreshAccessToken();
      return this.fetchWithAuth(url, options, false);
    }

    return response;
  }

  async initialize(code: string): Promise<void> {
    if (!code) {
      throw new Error('Invalid code');
    }

    try {
      const response = await fetch(`${config.BASE_API_URL}/oauth2/discord`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate with Discord');
      }

      const { access_token, refresh_token, jwt_token } = await response.json();
      this.accessToken = access_token;
      this.refreshToken = refresh_token;
      localStorage.setItem('jwt_token', jwt_token);
    } catch (error) {
      throw new Error(
        'An error occurred while trying to authenticate with Discord. Please try again.'
      );
    }
  }

  async refreshAccessToken(): Promise<void> {
    const data = {
      refresh_token: this.refreshToken,
      grant_type: 'refresh_token',
    };

    const response = await fetch(
      `${config.BASE_API_URL}/oauth2/discord/refresh`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      throw new Error('Failed to refresh access token');
    }

    const { access_token, refresh_token, jwt_token } = await response.json();
    this.accessToken = access_token;
    this.refreshToken = refresh_token;
    localStorage.setItem('jwt_token', jwt_token);
  }

  async getDiscordUser(): Promise<DiscordUser> {
    const response = await this.fetchWithAuth(
      'https://discordapp.com/api/users/@me'
    );
    return response.json();
  }
}
