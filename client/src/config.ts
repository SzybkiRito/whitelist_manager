interface Config {
  BASE_FIVEM_API_URL: string;
  REFRESH_TOKEN_MAX_ATTEMPTS: number;
  FIVEM_SERVER_ID: string;
  GUILD_SERVER_ID: string;
  SERVER_AUTHORIZED_ROLES: string[];
  DISCORD_OAUTH2_URL: string;
  BASE_API_URL: string;
  maxApplicationPerUser: number;
}

// You have to generate your own url with the following scopes: identify, guilds, guilds.members.read
const DISCORD_OAUTH2_URL = `https://discord.com/api/oauth2/authorize?client_id=${
  import.meta.env.VITE_DISCORD_CLIENT_ID
}&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauthorize&scope=identify+guilds+guilds.members.read`;

export const config: Config = {
  BASE_FIVEM_API_URL: 'https://servers-frontend.fivem.net/api',
  GUILD_SERVER_ID: '',
  REFRESH_TOKEN_MAX_ATTEMPTS: 1,
  BASE_API_URL: 'http://localhost:5000/api/v1',
  SERVER_AUTHORIZED_ROLES: ['', ''],
  DISCORD_OAUTH2_URL,
  FIVEM_SERVER_ID: '',
  maxApplicationPerUser: 2,
};
