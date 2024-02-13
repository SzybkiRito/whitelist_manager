/* eslint-disable @typescript-eslint/comma-dangle */
import express from 'express';
import { DiscordOAuthController } from '../controllers/DiscordOAuthController';
import {
  DiscordOAuthCode,
  DiscordTokenResponse,
  RefreshTokenRequest,
} from '../interfaces/DiscordOAuthInterfaces';

const router = express.Router();
router.post<{}, DiscordTokenResponse, DiscordOAuthCode>(
  '/',
  async (req, res, next) => {
    try {
      const requestToken = await DiscordOAuthController.getOAuth2Token(
        req.body
      );
      res.json(requestToken);
    } catch (e) {
      next(e);
    }
  }
);

router.post<{}, DiscordTokenResponse, RefreshTokenRequest>(
  '/refresh',
  async (req, res, next) => {
    try {
      const requestToken = await DiscordOAuthController.refreshOAuth2Token(
        req.body
      );
      res.json(requestToken);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
