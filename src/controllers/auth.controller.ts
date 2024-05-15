import { SignupRequest } from "../models/auth/signup-request.model";
import { Request, Response } from 'express';
import { connection } from '../config/db/db';
import { transporter } from '../config/mail';
import { PoolConnection } from "mysql2";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export class AuthController {

  public async registerUser ( req: Request, res: Response ) {
    req.body.password = await bcrypt.hash( req.body.password, 12 );
    let uuid = crypto.randomUUID()
    try {
      const result = await connection<any[]>
        `INSERT INTO users (email, password, username, uuid) 
        VALUES (${req.body.email}, ${req.body.password}, ${req.body.username}, ${uuid})
      `
      var mailOptions = {
        from: 'culturaxya@gmail.com',
        to: req.body.email,
        subject: 'Bienvenido a Culturaxya',
        text: 'Por favor, visita el siguiente link para confirmar tu mail ' + uuid,
        html: "<p>Por favor, visita el siguiente link para confirmar tu mail</p> <a href='https://culturaxya.com?uuid=" + uuid + "' style='background-color: blue; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;'>Confirmar Mail</a>",
      };

      transporter.sendMail( mailOptions, function ( error, info ) {
        if ( error ) {
          console.log( 'Email fail: ' + error );
          res.status( 200 ).send( {
            message: 'Se ha registrado el usuario pero no se ha podido enviar el correo de confirmación',
            result: true
          } );
        } else {
          console.log( 'Email sent: ' + info.response );
          res.status( 200 ).send( {
            message: 'OK',
            result: true
          } );
        }
      } );
    } catch ( error ) {
      res.status( 500 ).send( {
        message: 'INTERNAL SERVER ERROR: ' + error,
        result: false
      } );
    }
  }

  public async login ( req: Request, res: Response ) {
    try {
      const result = await connection<any[]>
        ` SELECT *
      FROM users
      WHERE username = ${req.body.username}
    `
      if ( !result.length ) {
        res.status( 500 ).send( {
          message: 'User Not Found',
          result: false
        } );

      } else if ( !result[0].active ) {
        res.status( 412 ).send( {
          message: 'User not active yet',
          result: false
        } );

      } else if ( await bcrypt.compare( req.body.password, result[0].password ) ) {
        const tokenPayload = {
          email: result[0].email,
        };
        const accessToken = jwt.sign( tokenPayload, 'SECRET' );
        res.status( 201 ).json( {
          message: 'User Logged In!',
          data: {
            accessToken,
            user: {
              username: result[0].username,
              email: result[0].email,
              isRegistered: true
            }
          },
        } );
      } else {
        res.status( 500 ).send( {
          message: 'Wrong Password!',
          result: false
        } );
      }
    } catch ( error ) {
      res.status( 500 ).send( {
        message: 'INTERNAL SERVER ERROR: ' + error,
        result: false
      } );
    }
  }

  public async confirmEmail ( req: Request, res: Response ) {

    const result = await connection<any[]>`SELECT * FROM users WHERE uuid = ${req.body.uuid}`

    if ( !result.length ) {
      res.status( 500 ).send( {
        message: 'User Not Found',
        result: false
      } );
    } else {
      try {
        await connection<any[]>`UPDATE users SET active = true WHERE uuid = ${req.body.uuid}`
        res.status( 200 ).send( {
          message: 'OK',
          result: true
        } );
      } catch ( error ) {
        res.status( 500 ).send( {
          message: 'INTERNAL SERVER ERROR: ' + error,
          result: false
        } );
      }
    }
  }
}