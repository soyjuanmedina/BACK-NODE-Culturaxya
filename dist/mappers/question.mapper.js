"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionMapper = void 0;
const question_response_model_1 = require("../models/question-response.model");
class QuestionMapper {
    requestToResponse(request) {
        let response = new question_response_model_1.QuestionResponse();
        response.explanation = request.explanation;
        response.question = request.question;
        response.theme = request.theme;
        response.level = request.level;
        let answers = [
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
        ];
        response.answers = answers;
        return response;
    }
    requestListToResponseList(request) {
        let response = [];
        for (let questionRequest of request) {
            let questionResponse = this.requestToResponse(questionRequest);
            response.push(questionResponse);
        }
        return response;
    }
}
exports.QuestionMapper = QuestionMapper;
//# sourceMappingURL=question.mapper.js.map