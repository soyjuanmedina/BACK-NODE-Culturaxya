import { Request, Response } from 'express';
import { QuestionRequest } from '../models/question-request.model';
import { connection } from '../config/db/db';
import { QueryError, PoolConnection } from 'mysql2';
import { QuestionMapper } from '../mappers/question.mapper'
import { QuestionResponse } from '../models/question-response.model';
export class QuestionController {

  public async getAll ( req: Request, res: Response ) {

    let number = req.query.number || 10

    let theme = req.query.theme as string;

    let level = req.query.level as string;

    try {
      let result = null;
      if ( theme && level ) {
        result = await connection<any[]>
          `select * from questions where theme = ${theme} and level = ${level}`
      } else if ( theme ) {
        result = await connection<any[]>
          `select * from questions where theme = ${theme}`
      } else if ( level ) {
        result = await connection<any[]>
          `select * from questions where theme = ${level}`
      }

      let questionMapper: QuestionMapper = new QuestionMapper();
      let responseList = questionMapper.requestListToResponseList( result );
      if ( responseList.length < Number( number ) ) {
        res.status( 206 ).send( {
          message: 'NOT_ENOUGH',
          result: responseList
        } );
      }
      else {
        function getRamdomsOfList ( questionsEntities: QuestionResponse[], number ): QuestionResponse[] {
          let randomList: QuestionResponse[] = [];
          for ( let i = 0; i < number; i++ ) {
            let index: number = Math.floor( Math.random() * questionsEntities.length );
            let randomQuestion: QuestionResponse = questionsEntities[index];
            while ( randomList.includes( randomQuestion ) ) {
              index = Math.floor( Math.random() * questionsEntities.length );
              randomQuestion = questionsEntities[index];
            }
            randomList.push( randomQuestion );
          }
          return randomList;
        }
        let response = getRamdomsOfList( responseList, number )
        res.status( 200 ).send( {
          message: 'OK',
          result: response
        } );
      }
    } catch ( error ) {
      res.status( 500 ).send( {
        message: 'INTERNAL SERVER ERROR: ' + error,
        result: false
      } );
    }

  }
}


