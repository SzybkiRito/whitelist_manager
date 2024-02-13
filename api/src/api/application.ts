/* eslint-disable @typescript-eslint/comma-dangle */

import express from 'express';
import {
  ApplicationRequest,
  ApplicationResponse,
} from '../interfaces/AppplicationResponse';
import { WhitelistController } from '../controllers/WhitelistController';
import MessageResponse from '../interfaces/MessageResponse';
import { authenticateToken, roleAuthorize, unless } from '../middlewares';

const router = express.Router();
router.use(authenticateToken);
router.use(unless('/', 'POST', roleAuthorize));

router.get<{}, ApplicationResponse[]>('/', async (req, res) => {
  const applications = await WhitelistController.getApplications();
  res.json(applications);
});

router.get<{}, ApplicationResponse[]>('/waiting', async (req, res) => {
  const applications = await WhitelistController.getNotProcessedApplications();
  res.json(applications);
});

router.get<{}, ApplicationResponse[]>('/rejected', async (req, res) => {
  const applications = await WhitelistController.getRejectedApplications();
  res.json(applications);
});

router.get<{}, ApplicationResponse[]>('/accepted', async (req, res) => {
  const applications = await WhitelistController.getAcceptedApplications();
  res.json(applications);
});

router.get<{}, ApplicationResponse[]>('/', async (req, res) => {
  const applications = await WhitelistController.getApplications();
  res.json(applications);
});

type RouteParams = {
  discordId: string;
};
router.get<RouteParams, ApplicationResponse[]>(
  '/:discordId',
  async (req, res, next) => {
    try {
      const applications = await WhitelistController.getApplicationsByDiscordId(
        req.params.discordId
      );

      res.json(applications);
    } catch (err) {
      next(err);
    }
  }
);

router.post<{}, ApplicationResponse | MessageResponse, ApplicationRequest>(
  '/',
  async (req, res, next) => {
    try {
      const application = await WhitelistController.createApplication(req.body);
      res.json(application);
    } catch (err) {
      next(err);
    }
  }
);

router.patch('/:id', async (req, res, next) => {
  const applicationId = req.params.id;

  try {
    const result = await WhitelistController.updateApplicationStatus(
      applicationId,
      req.body
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
