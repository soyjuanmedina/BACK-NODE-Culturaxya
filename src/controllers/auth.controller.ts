import { SignupRequest } from "../models/auth/signup-request.model";
import { Request, Response } from 'express';
import { connection } from '../config/db/db';
import { transporter } from '../config/mail';
import { PoolConnection } from "mysql2";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export class AuthController {

  public async registerUser(req: Request, res: Response) {

    req.body.password=await bcrypt.hash(req.body.password, 12);
    let uuid=crypto.randomUUID()
    connection.getConnection((err: any, conn: PoolConnection) => {
      conn.query("INSERT INTO users (email, password, username, uuid) VALUES (?, ?, ?, ?)",
        [req.body.email, req.body.password, req.body.username, uuid], (err, result: any) => {
          conn.release();
          if (err) {
            res.status(500).send({
              message: 'INTERNAL SERVER ERROR: '+err.message,
              result: false
            });
          } else {

            var mailOptions={
              from: 'culturaxya@gmail.com',
              to: req.body.email,
              subject: 'Bienvenido a Culturaxya',
              text: 'Por favor, visita el siguiente link para confirmar tu mail '+uuid,
              html: "<p>Por favor, visita el siguiente link para confirmar tu mail</p> <a href='https://culturaxya.com/confirmemail/"+uuid+"' style='background-color: blue; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;'>Confirmar Mail</a>",
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: '+info.response);
              }
            });



            res.status(200).send({
              message: 'OK',
              result: true
            });
          }
        })
    });
  }

  public async login(req: Request, res: Response) {

    connection.getConnection((err: any, conn: PoolConnection) => {
      conn.query("SELECT * FROM users WHERE username = ?",
        [req.body.username], async (err, result: any) => {
          if (!result.length) {
            res.status(500).send({
              message: 'User Not Found',
              result: false
            });

          } if (!result[0].active) {
            res.status(412).send({
              message: 'User not active yet',
              result: false
            });

          } else if (await bcrypt.compare(req.body.password, result[0].password)) {
            const tokenPayload={
              email: result.email,
            };
            const accessToken=jwt.sign(tokenPayload, 'SECRET');
            res.status(201).json({
              message: 'User Logged In!',
              data: {
                accessToken,
                user: {
                  username: result[0].username,
                  email: result[0].email,
                  isRegistered: true
                }
              },
            });
          } else {
            res.status(500).send({
              message: 'Wrong Password!',
              result: false
            });
          }
        })
    });
  }

  public async confirmEmail(req: Request, res: Response) {

    connection.getConnection((err: any, conn: PoolConnection) => {
      conn.query("SELECT * FROM users WHERE uuid = ?",
        [req.body.uuid], async (err, result: any) => {
          if (!result.length) {
            res.status(500).send({
              message: 'User Not Found',
              result: false
            });
          } else {
            connection.getConnection((err: any, conn: PoolConnection) => {
              conn.query("UPDATE users SET active = 1 WHERE uuid = ?",
                [req.body.uuid], (err, result: any) => {
                  conn.release();
                  if (err) {
                    res.status(500).send({
                      message: 'INTERNAL SERVER ERROR: '+err.message,
                      result: false
                    });
                  } else {
                    res.status(200).send({
                      message: 'OK',
                      result: true
                    });
                  }
                })
            });





          }
        })
    });
  }

}