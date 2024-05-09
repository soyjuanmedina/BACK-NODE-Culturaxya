"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db");
const question_mapper_1 = require("../mappers/question.mapper");
const getAll = (req, res) => {
    let theme = req.query.theme;
    let number = req.query.number;
    let questionMapper = new question_mapper_1.QuestionMapper();
    db_1.connection.getConnection((err, conn) => {
        function getRamdomsOfList(questionsEntities, number) {
            let randomList = [];
            for (let i = 0; i < number; i++) {
                let index = Math.floor(Math.random() * questionsEntities.length);
                let randomQuestion = questionsEntities[index];
                while (randomList.includes(randomQuestion)) {
                    index = Math.floor(Math.random() * questionsEntities.length);
                    randomQuestion = questionsEntities[index];
                }
                randomList.push(randomQuestion);
            }
            return randomList;
        }
        conn.query("select * from questions where theme = '" + theme + "'", (err, resultSet) => {
            conn.release();
            if (err) {
                res.status(500).send({
                    message: 'INTERNAL SERVER ERROR',
                    result: null
                });
            }
            else {
                let responseList = questionMapper.requestListToResponseList(resultSet);
                let response = getRamdomsOfList(responseList, number);
                res.status(200).send({
                    message: 'OK',
                    result: response
                });
            }
        });
    });
};
exports.default = { getAll };
