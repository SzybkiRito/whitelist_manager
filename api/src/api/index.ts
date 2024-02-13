import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';
import application from './application';
import discordAuthorization from './DiscordAuthorization';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'Whitelist API v1.0.0.',
  });
});

router.use('/applications', application);
router.use('/oauth2/discord', discordAuthorization);

export default router;
