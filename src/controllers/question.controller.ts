import { Request, Response } from 'express';
import { transporter } from '../config/mail';
import { connection } from '../config/db/db';
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
          `select * from questions where theme = ${theme} and level = ${level} and checked = 1`
      } else if ( theme ) {
        result = await connection<any[]>
          `select * from questions where theme = ${theme} and checked = 1`
      } else if ( level ) {
        result = await connection<any[]>
          `select * from questions where theme = ${level} and checked = 1`
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

  public async propose ( req: Request, res: Response ) {
    let result = null;
    try {
      result = await connection<any[]>
        `insert into questions (correct_answer,explanation,other_answer_1,other_answer_2,other_answer_3,question,level,theme,checked) 
        values (${req.body.correctAnswer}, ${req.body.explanation},
          ${req.body.otherAnswer1},${req.body.otherAnswer2},
          ${req.body.otherAnswer3},${req.body.question},
          ${req.body.level},${req.body.theme},
          0)`

      var mailOptions = {
        from: 'culturaxya@gmail.com',
        to: 'soyjuanmedina@gmail.com',
        subject: 'Nueva pregunta propuesta en Culturaxya',
        text: 'Se ha propuesto una nueva pregunta en Culturaxya, por favor revísala para activarla'
      };

      transporter.sendMail( mailOptions );

      res.status( 200 ).send( {
        message: 'OK',
        result: result
      } );
    } catch ( error ) {
      res.status( 500 ).send( {
        message: 'INTERNAL SERVER ERROR: ' + error,
        result: false
      } );
    }

  }
}


