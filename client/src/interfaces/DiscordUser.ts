/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  premium_type: number;
  flags: number;
  banner?: any; // I don't know what's should be in the response to give more specific type
  accent_color?: any; // I don't know what's should be in the response to give more specific type
  global_name: string;
  avatar_decoration_data?: any; // I don't know what's should be in the response to give more specific type
  banner_color?: any; // I don't know what's should be in the response to give more specific type
  mfa_enabled: boolean;
  locale: string;
}
