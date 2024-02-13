export interface ApplicationResponse {
  id: number;
  name: string;
  discord_id: string;
  answers: string;
}

export interface ApplicationRequest {
  [x: string]: any;
  name: string;
  discord_id: string;
  answers: string;
}

export interface UpdateApplicationStatusBody {
  status: boolean;
}
