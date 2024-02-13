/* eslint-disable @typescript-eslint/comma-dangle */
import { ApiError } from '../constants/ApiError';
import { database } from '../database';
import {
  ApplicationRequest,
  ApplicationResponse,
  UpdateApplicationStatusBody,
} from '../interfaces/AppplicationResponse';

export class WhitelistApplicationService {
  public static async getApplications(): Promise<ApplicationResponse[]> {
    const [rows] = (await database
      .promise()
      .query('SELECT * FROM applications')) as any[];

    return rows as ApplicationResponse[];
  }

  public static async getApplicationsByStatus(
    status: number
  ): Promise<ApplicationResponse[]> {
    const [rows] = (await database
      .promise()
      .query('SELECT * FROM applications WHERE status = ?', [status])) as any[];

    return rows as ApplicationResponse[];
  }

  public static async getApplicationsByDiscordId(
    discordId: string
  ): Promise<ApplicationResponse[]> {
    try {
      const [rows] = (await database
        .promise()
        .query('SELECT * FROM applications WHERE discord_id = ?', [
          discordId,
        ])) as any[];

      return rows as ApplicationResponse[];
    } catch (e: any) {
      return Promise.reject(e);
    }
  }

  public static async getNumberOfApplicationsByDiscordId(
    discordId: string
  ): Promise<number> {
    const [rows] = (await database
      .promise()
      .query('SELECT * FROM applications WHERE discord_id = ?', [
        discordId,
      ])) as any[];

    return rows.length;
  }

  public static async createApplication(
    application: ApplicationRequest
  ): Promise<ApplicationResponse> {
    try {
      const [rows] = (await database
        .promise()
        .query(
          'INSERT INTO applications (id, name, discord_id, answers) VALUES (0, ?, ?, ?)',
          [application.name, application.discord_id, application.answers]
        )) as any[];

      if (rows.affectedRows === 0)
        throw new ApiError('Application not created', 400);

      const result: ApplicationResponse = {
        id: rows.insertId,
        name: application.name,
        discord_id: application.discord_id,
        answers: application.answers,
      };

      return result;
    } catch (e: any) {
      return Promise.reject(e);
    }
  }

  public static async updateStatusOfApplication(
    applicationId: number,
    status: UpdateApplicationStatusBody
  ): Promise<ApplicationResponse> {
    try {
      const statusInt = status.status ? 1 : 0;
      const [rows] = (await database
        .promise()
        .query('UPDATE applications SET status = ? WHERE id = ?', [
          statusInt,
          applicationId,
        ])) as any[];

      if (rows.affectedRows === 0)
        throw new ApiError('Application not found', 400);

      const [application] = (await database
        .promise()
        .query('SELECT * FROM applications WHERE id = ?', [
          applicationId,
        ])) as any[];

      if (application.length === 0)
        throw new ApiError('Application not found', 400);

      return application[0];
    } catch (e: any) {
      return Promise.reject(e);
    }
  }
}
