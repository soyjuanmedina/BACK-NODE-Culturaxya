import { Request, Response } from 'express';
import { QuestionRequest } from '../models/question-request.model';
import { connection } from '../config/db';
import { QueryError, PoolConnection } from 'mysql2';
import { QuestionMapper } from '../mappers/question.mapper'
import { QuestionResponse } from '../models/question-response.model';

const getAll=(req: Request, res: Response) => {

  let theme=req.query.theme

  let level=req.query.level

  let number=req.query.number||10

  let params=[]

  console.log('req.query', theme, level, number, theme&&level);

  "select * from questions where theme = ? and level = ?"

  let query="select * from questions"

  if (theme&&level) {
    query=query+" where theme = ? and level = ?"
    params=[theme, level]
  } else if (theme) {
    query=query+" where theme = ?"
    params=[theme]
  } else if (level) {
    query=query+" where level = ?"
    params=[level]
  }

  console.log('query, params', query, params);

  let questionMapper: QuestionMapper=new QuestionMapper();
  connection.getConnection((err: any, conn: PoolConnection) => {

    conn.query(query, params, (err, resultSet: any) => {
      conn.release();
      if (err) {
        res.status(500).send({
          message: 'INTERNAL SERVER ERROR',
          result: null
        });
      } else {

        let responseList=questionMapper.requestListToResponseList(resultSet);
        if (responseList.length<Number(number)) {
          res.status(200).send({
            message: 'No hay suficientes preguntas de este nivel',
            result: responseList
          });
        }
        else {
          let response=getRamdomsOfList(responseList, number)
          res.status(200).send({
            message: 'OK',
            result: response
          });
        }
      }
    })

    function getRamdomsOfList(questionsEntities: QuestionResponse[], number): QuestionResponse[] {
      let randomList: QuestionResponse[]=[];

      for (let i=0; i<number; i++) {

        let index: number=Math.floor(Math.random()*questionsEntities.length);

        let randomQuestion: QuestionResponse=questionsEntities[index];

        while (randomList.includes(randomQuestion)) {
          index=Math.floor(Math.random()*questionsEntities.length);
          randomQuestion=questionsEntities[index];
        }

        randomList.push(randomQuestion);

      }

      return randomList;
    }
  });
}



export default { getAll }

