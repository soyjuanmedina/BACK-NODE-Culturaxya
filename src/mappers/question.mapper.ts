import { AnswerResponse } from "../models/answer-response.model";
import { QuestionRequest } from "../models/question-request.model";
import { QuestionResponse } from "../models/question-response.model";

export class QuestionMapper {

  requestToResponse(request: QuestionRequest): QuestionResponse {
    let response: QuestionResponse = new QuestionResponse();
    response.explanation = request.explanation;
    response.question = request.question;
    response.theme = request.theme;
    let answers: AnswerResponse[] = [
      {
        answer: request.correct_answer,
        isCorret: true
      },
      {
        answer: request.other_answer_1,
        isCorret: false
      },
      {
        answer: request.other_answer_2,
        isCorret: false
      },
      {
        answer: request.other_answer_3,
        isCorret: false
      }
    ]
    response.answers = answers;
    return response;
  }

  requestListToResponseList(request: QuestionRequest[]): QuestionResponse[] {
    let response: QuestionResponse[] = [];
    for (let questionRequest of request) {
      let questionResponse = this.requestToResponse(questionRequest);
      response.push(questionResponse);
    }
    return response;
  }

}