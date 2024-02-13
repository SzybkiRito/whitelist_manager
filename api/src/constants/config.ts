interface Config {
  JWT_SECRET: string;
  DISCORD_BOT_TOKEN: string;
  DISCORD_CLIENT_ID: string;
  GUILD_SERVER_ID: string;
  SERVER_AUTHORIZED_ROLES: string[];
  MAX_APPLICATION_PER_USER: number;
}

const { DISCORD_BOT_TOKEN, DISCORD_CLIENT_ID, JWT_SECRET } = process.env;

if (!DISCORD_BOT_TOKEN || !DISCORD_CLIENT_ID || !JWT_SECRET) {
  throw new Error('Missing environment variables');
}

export const config: Config = {
  DISCORD_BOT_TOKEN,
  GUILD_SERVER_ID: '',
  SERVER_AUTHORIZED_ROLES: ['', ''],
  DISCORD_CLIENT_ID,
  JWT_SECRET,
  MAX_APPLICATION_PER_USER: 1,
};
