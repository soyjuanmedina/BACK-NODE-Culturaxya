"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../config/db/db");
const question_mapper_1 = require("../mappers/question.mapper");
const getAll = (req, res) => {
    let theme = req.query.theme;
    let level = req.query.level;
    let number = req.query.number || 10;
    let params = [];
    "select * from questions where theme = ? and level = ?";
    let query = "select * from questions";
    if (theme && level) {
        query = query + " where theme = ? and level = ?";
        params = [theme, level];
    }
    else if (theme) {
        query = query + " where theme = ?";
        params = [theme];
    }
    else if (level) {
        query = query + " where level = ?";
        params = [level];
    }
    let questionMapper = new question_mapper_1.QuestionMapper();
    db_1.connection.getConnection((err, conn) => {
        conn.query(query, params, (err, resultSet) => {
            conn.release();
            if (err) {
                res.status(500).send({
                    message: 'INTERNAL SERVER ERROR',
                    result: null
                });
            }
            else {
                let responseList = questionMapper.requestListToResponseList(resultSet);
                if (responseList.length < Number(number)) {
                    res.status(200).send({
                        message: 'No hay suficientes preguntas de este nivel',
                        result: responseList
                    });
                }
                else {
                    let response = getRamdomsOfList(responseList, number);
                    res.status(200).send({
                        message: 'OK',
                        result: response
                    });
                }
            }
        });
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
    });
};
exports.default = { getAll };
//# sourceMappingURL=question.controller.js.map