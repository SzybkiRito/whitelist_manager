/* eslint-disable @typescript-eslint/comma-dangle */
import jwt from 'jsonwebtoken';
import { ApiError } from '../constants/ApiError';
import {
  DiscordOAuthCode,
  DiscordOAuthRefreshRequest,
  DiscordOAuthRequest,
  DiscordTokenResponse,
  JwtToken,
  RefreshTokenRequest,
} from '../interfaces/DiscordOAuthInterfaces';
import { Body, Post, Route, Tags } from 'tsoa';
import { config } from '../constants/config';

@Tags('OAuth2')
@Route('/api/v1/oauth2/discord')
export class DiscordOAuthController {
  private static readonly API_BASE_URL = 'https://discord.com/api/v10';

  private static readonly CLIENT_ID = process.env.DISCORD_CLIENT_ID;

  private static readonly CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;

  private static readonly REDIRECT_URI = process.env.DISCORD_OAUTH_REDIRECT_URI;

  private static generateToken(data: JwtToken): string {
    return jwt.sign(data, config.JWT_SECRET);
  }

  @Post('/')
  public static async getOAuth2Token(
    @Body() requestBody: DiscordOAuthCode
  ): Promise<DiscordTokenResponse> {
    if (requestBody.code === '') throw new ApiError('Code not provided', 400);

    if (
      !DiscordOAuthController.CLIENT_ID ||
      !DiscordOAuthController.CLIENT_SECRET ||
      !DiscordOAuthController.REDIRECT_URI
    )
      throw new ApiError('Discord OAuth2 credentials not set', 401);

    const data: DiscordOAuthRequest = {
      client_id: DiscordOAuthController.CLIENT_ID,
      client_secret: DiscordOAuthController.CLIENT_SECRET,
      code: requestBody.code,
      grant_type: 'authorization_code',
      redirect_uri: DiscordOAuthController.REDIRECT_URI,
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const response = await fetch(
        `${DiscordOAuthController.API_BASE_URL}/oauth2/token`,
        {
          method: 'POST',
          headers: headers,
          body: new URLSearchParams(data),
        }
      );
      const responseDate = await response.json();
      const permissions = (await this.isAuthorizedUser(
        responseDate.access_token
      ))
        ? ['ADMIN']
        : [];

      return {
        ...responseDate,
        jwt_token: this.generateToken({
          access_token: responseDate.access_token,
          permissions: permissions,
        }),
      };
    } catch (error) {
      throw new ApiError(error as string, 400);
    }
  }

  @Post('/api/v1/oauth2/discord/refresh')
  public static async refreshOAuth2Token(
    @Body() requestBody: RefreshTokenRequest
  ): Promise<DiscordTokenResponse> {
    if (requestBody.refresh_token === '')
      throw new ApiError('Refresh token not provided', 400);

    if (
      !DiscordOAuthController.CLIENT_ID ||
      !DiscordOAuthController.CLIENT_SECRET
    )
      throw new ApiError('Discord OAuth2 credentials not set', 401);

    const data: DiscordOAuthRefreshRequest = {
      client_id: DiscordOAuthController.CLIENT_ID,
      client_secret: DiscordOAuthController.CLIENT_SECRET,
      grant_type: requestBody.grant_type,
      refresh_token: requestBody.refresh_token,
    };
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    try {
      const response = await fetch(
        `${DiscordOAuthController.API_BASE_URL}/oauth2/token`,
        {
          method: 'POST',
          headers: headers,
          body: new URLSearchParams(data),
        }
      );
      const responseDate = await response.json();
      const permissions = (await this.isAuthorizedUser(
        responseDate.access_token
      ))
        ? ['ADMIN']
        : [];

      return {
        ...responseDate,
        jwt_token: this.generateToken({
          access_token: responseDate.access_token,
          permissions: permissions,
        }),
      };
    } catch (error) {
      throw new ApiError(error as string, 400);
    }
  }

  private static async isAuthorizedUser(
    userAccessToken: string
  ): Promise<boolean> {
    try {
      const response = await fetch(
        `https://discordapp.com/api/users/@me/guilds/${config.GUILD_SERVER_ID}/member`,
        {
          headers: {
            Authorization: `Bearer ${userAccessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      if (!response.ok) return false;

      const { roles }: { roles: string[] } = await response.json();
      return config.SERVER_AUTHORIZED_ROLES.some((roleId) =>
        roles.includes(roleId)
      );
    } catch (e) {
      return false;
    }
  }
}
