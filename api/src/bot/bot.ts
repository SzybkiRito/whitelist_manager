/* eslint-disable @typescript-eslint/comma-dangle */
import { Client, GatewayIntentBits, IntentsBitField } from 'discord.js';
import { config } from '../constants/config';

export default class DiscordBot {
  private static instance: DiscordBot;

  private client: Client;

  private intents: GatewayIntentBits[] = [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
  ];

  private constructor() {
    this.client = new Client({
      intents: this.intents,
    });

    this.client.once('ready', () => {
      console.log('\x1b[33m[LOGS]:\x1b[0m Whitelist bot is ready!');
    });

    this.client.login(config.DISCORD_BOT_TOKEN);
  }

  public static getInstance(): DiscordBot {
    if (!DiscordBot.instance) {
      DiscordBot.instance = new DiscordBot();
    }
    return DiscordBot.instance;
  }

  public async sendPrivateMessage(
    userId: string,
    message: string
  ): Promise<void> {
    try {
      const user = await this.client.users.fetch(userId);
      await user.send(message);
      console.log(
        '\x1b[33m[LOGS]:\x1b[0m\x1b[0m Sent a private message to ${user.tag}'
      );
    } catch (error) {
      console.error(
        '\x1b[31m[ERROR]:\x1b[0m to send a private message: ${error}'
      );
    }
  }
}
