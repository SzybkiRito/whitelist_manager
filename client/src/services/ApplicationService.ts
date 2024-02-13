import { config } from '../config';
import { DiscordUser } from '../interfaces/DiscordUser';
import { QuestionAnswer } from '../interfaces/Question';

export default class ApplicationService {
  private API_ENDPOINT = `${config.BASE_API_URL}/applications`;

  public static async processAplication(
    status: boolean,
    applicationId: number
  ): Promise<boolean> {
    const API_ENDPOINT = `${config.BASE_API_URL}/applications/${applicationId}`;
    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
        },
        body: JSON.stringify({ status }),
      });
      if (response.status === 200) {
        return true;
      }

      return false;
    } catch (error) {
      if (import.meta.env.MODE === 'development') {
        console.error(error);
      }

      return false;
    }
  }

  public async submitApplication(
    discordUser: DiscordUser,
    questionAnswer: QuestionAnswer
  ): Promise<boolean> {
    const requestBody = {
      name: discordUser.global_name,
      discord_id: discordUser.id,
      answers: JSON.stringify(questionAnswer),
    };

    try {
      const response = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('jwt_token')}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (response.status !== 200) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }
}
