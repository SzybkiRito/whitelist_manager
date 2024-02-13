export interface Question {
  id: number;
  type: 'text' | 'numeric';
  question: string;
  min: number;
  max: number;
}

export interface QuestionAnswer extends Question {
  answer: string | number;
}

export interface ApplicationResponse {
  id: number;
  name: string;
  discord_id: string;
  answers: { [key: string]: string };
  status: number;
}
