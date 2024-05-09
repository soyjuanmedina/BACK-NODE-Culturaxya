import { SignupRequest } from "../models/auth/signup-request.model";
import { Request, Response } from 'express';
import { connection } from '../config/db';
import { PoolConnection } from "mysql2";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export class AuthController {

  public async registerUser(req: Request, res: Response) {
    req.body.password = await bcrypt.hash(req.body.password, 12);
    connection.getConnection((err: any, conn: PoolConnection) => {
      conn.query("INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
        [req.body.email, req.body.password, req.body.username], (err, result: any) => {
          conn.release();
          if (err) {
            res.status(500).send({
              message: 'INTERNAL SERVER ERROR: ' + err.message,
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

  public async login(req: Request, res: Response) {

    connection.getConnection((err: any, conn: PoolConnection) => {
      conn.query("SELECT * FROM users WHERE username = ?",
        [req.body.username], async (err, result: any) => {

          console.log('req.body', req.body, result);

          if (!result.length) {
            res.status(500).send({
              message: 'User Not Found!',
              result: false
            });

          } else if (await bcrypt.compare(req.body.password, result[0].password)) {
            const tokenPayload = {
              email: result.email,
            };
            const accessToken = jwt.sign(tokenPayload, 'SECRET');
            res.status(201).json({
              status: 'Success',
              message: 'User Logged In!',
              data: {
                accessToken,
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

}