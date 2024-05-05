import { RowDataPacket } from "mysql2"

export class QuestionRequest {
  theme?: string;
  question?: string;
  correct_answer?: string;
  other_answer_1?: string;
  other_answer_2?: string;
  other_answer_3?: string;
  explanation?: string;
}