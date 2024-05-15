"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const db_1 = require("../config/db/db");
const mail_1 = require("../config/mail");
const bcrypt_1 = __importDefault(require("bcrypt"));
class AuthController {
    registerUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.password = yield bcrypt_1.default.hash(req.body.password, 12);
            let uuid = crypto.randomUUID();
            db_1.connection.getConnection((err, conn) => {
                conn.query("INSERT INTO users (email, password, username, uuid) VALUES (?, ?, ?, ?)", [req.body.email, req.body.password, req.body.username, uuid], (err, result) => {
                    conn.release();
                    if (err) {
                        res.status(500).send({
                            message: 'INTERNAL SERVER ERROR: ' + err.message,
                            result: false
                        });
                    }
                    else {
                        var mailOptions = {
                            from: 'culturaxya@gmail.com',
                            to: req.body.email,
                            subject: 'Bienvenido a Culturaxya',
                            text: 'Por favor, visita el siguiente link para confirmar tu mail ' + uuid,
                            html: "<p>Por favor, visita el siguiente link para confirmar tu mail</p> <a href='https://culturaxya.com?uuid=" + uuid + "' style='background-color: blue; border: none; color: white; padding: 15px 32px; text-align: center; text-decoration: none; display: inline-block; font-size: 16px;'>Confirmar Mail</a>",
                        };
                        mail_1.transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                console.log(error);
                            }
                            else {
                                console.log('Email sent: ' + info.response);
                            }
                        });
                        res.status(200).send({
                            message: 'OK',
                            result: true
                        });
                    }
                });
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('uadsdsafasdfser');
            const { email, password } = req.body;
            const user = yield (0, db_1.connection) `
              SELECT
               *
             FROM public.users
             WHERE 
               users.email = ${email + '%'}
        `;
            console.log('uaser', user);
            /* connection.getConnection((err: any, conn: PoolConnection) => {
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
            }); */
        });
    }
    confirmEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            db_1.connection.getConnection((err, conn) => {
                conn.query("SELECT * FROM users WHERE uuid = ?", [req.body.uuid], (err, result) => __awaiter(this, void 0, void 0, function* () {
                    if (!result.length) {
                        res.status(500).send({
                            message: 'User Not Found',
                            result: false
                        });
                    }
                    else {
                        db_1.connection.getConnection((err, conn) => {
                            conn.query("UPDATE users SET active = 1 WHERE uuid = ?", [req.body.uuid], (err, result) => {
                                conn.release();
                                if (err) {
                                    res.status(500).send({
                                        message: 'INTERNAL SERVER ERROR: ' + err.message,
                                        result: false
                                    });
                                }
                                else {
                                    res.status(200).send({
                                        message: 'OK',
                                        result: true
                                    });
                                }
                            });
                        });
                    }
                }));
            });
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map