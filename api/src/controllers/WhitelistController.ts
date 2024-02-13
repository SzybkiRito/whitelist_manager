/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/comma-dangle */
import { Route, Get, Post, Patch, Body, Path, Tags, Security } from 'tsoa';
import {
  ApplicationRequest,
  ApplicationResponse,
  UpdateApplicationStatusBody,
} from '../interfaces/AppplicationResponse';
import MessageResponse from '../interfaces/MessageResponse';
import { WhitelistApplicationService } from '../services/WhitelistApplicationService';
import { ApiError } from '../constants/ApiError';
import DiscordBot from '..//bot/bot';
import { config } from '../constants/config';

@Tags('Applications')
@Security('jwt')
@Route('/api/v1/applications')
export class WhitelistController {
  @Get('/')
  public static async getApplications(): Promise<ApplicationResponse[]> {
    return WhitelistApplicationService.getApplications();
  }

  @Get('/waiting')
  public static async getNotProcessedApplications(): Promise<
    ApplicationResponse[]
  > {
    return WhitelistApplicationService.getApplicationsByStatus(-1);
  }

  @Get('/rejected')
  public static async getRejectedApplications(): Promise<
    ApplicationResponse[]
  > {
    return WhitelistApplicationService.getApplicationsByStatus(0);
  }

  @Get('/accepted')
  public static async getAcceptedApplications(): Promise<
    ApplicationResponse[]
  > {
    return WhitelistApplicationService.getApplicationsByStatus(1);
  }

  @Get('/{discordId}')
  public static async getApplicationsByDiscordId(
    @Path() discordId: string
  ): Promise<ApplicationResponse[]> {
    return WhitelistApplicationService.getApplicationsByDiscordId(discordId);
  }

  @Post('/')
  public static async createApplication(
    @Body() requestBody: ApplicationRequest
  ): Promise<ApplicationResponse | MessageResponse> {
    if (requestBody.discord_id === '')
      throw new ApiError('Discord ID is required', 400);

    const numberOfUserApplications =
      await WhitelistApplicationService.getNumberOfApplicationsByDiscordId(
        requestBody.discord_id
      );
    if (numberOfUserApplications > config.MAX_APPLICATION_PER_USER) {
      throw new ApiError(
        'User already has an application. Please wait for the current application to be processed.',
        400
      );
    }

    const result = await WhitelistApplicationService.createApplication(
      requestBody
    );
    DiscordBot.getInstance().sendPrivateMessage(
      requestBody.discord_id,
      'Your application has been submitted. Please wait for the result. Currently, we are processing applications every 24 hours. Thank you for your patience.'
    );

    return result;
  }

  @Patch('/{id}')
  public static async updateApplicationStatus(
    @Path() id: string,
    @Body() requestBody: UpdateApplicationStatusBody
  ): Promise<ApplicationResponse> {
    const applicationId = parseInt(id, 10);
    const result = await WhitelistApplicationService.updateStatusOfApplication(
      applicationId,
      requestBody
    );
    DiscordBot.getInstance().sendPrivateMessage(
      result.discord_id,
      `Your application has been ${
        requestBody.status ? 'accepted' : 'rejected'
      } Do not ask for the reason or DM the staff. If you have any questions, please ask in the support channel. Thank you!`
    );

    return result;
  }
}
