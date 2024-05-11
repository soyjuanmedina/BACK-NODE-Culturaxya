import { RowDataPacket } from "mysql2"
import { AnswerResponse } from "./answer-response.model";

export class QuestionResponse {
  theme?: string;
  question?: string;
  answers?: Array<AnswerResponse>
  explanation?: string;
  level?: string;
}