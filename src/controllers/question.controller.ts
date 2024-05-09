import { Request, Response } from 'express';
import { QuestionRequest } from '../models/question-request.model';
import { connection } from '../config/db';
import { QueryError, PoolConnection } from 'mysql2';
import { QuestionMapper } from '../mappers/question.mapper'
import { QuestionResponse } from '../models/question-response.model';

const getAll = (req: Request, res: Response) => {

  let theme = req.query.theme

  let number = req.query.number

  let questionMapper: QuestionMapper = new QuestionMapper();
  connection.getConnection((err: any, conn: PoolConnection) => {

    function getRamdomsOfList(questionsEntities: QuestionResponse[], number): QuestionResponse[] {
      let randomList: QuestionResponse[] = [];

      for (let i = 0; i < number; i++) {

        let index: number = Math.floor(Math.random() * questionsEntities.length);

        let randomQuestion: QuestionResponse = questionsEntities[index];

        while (randomList.includes(randomQuestion)) {
          index = Math.floor(Math.random() * questionsEntities.length);
          randomQuestion = questionsEntities[index];
        }

        randomList.push(randomQuestion);

      }

      return randomList;
    }

    conn.query("select * from questions where theme = '" + theme + "'", (err, resultSet: QuestionResponse[]) => {
      conn.release();
      if (err) {
        res.status(500).send({
          message: 'INTERNAL SERVER ERROR',
          result: null
        });
      } else {
        let responseList = questionMapper.requestListToResponseList(resultSet);
        let response = getRamdomsOfList(responseList, number)
        res.status(200).send({
          message: 'OK',
          result: response
        });
      }
    })
  });
}



export default { getAll }

