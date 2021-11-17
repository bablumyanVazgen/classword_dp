const { db } = require('../database/connection');
const { StatusCodes } = require('http-status-codes');
const { validationResult } = require('express-validator');

class Members {

    static index = (req, res) => {
        let sql = "SELECT * FROM members";

        db.query(sql, (err, result) => {
            if(err) throw err;
            res.send(result)
        })
    }


    static show = async (req, res) => {
        let userData = new Promise((resolve, reject) => {
            connection.query('SELECT * from `members` WHERE id=?', [req.params.id], function (error, results, fields) {
                if (error) return reject(error);

                resolve(results)
            });
        });
        let result = await userData;

        return res.status(StatusCodes.OK).json({ message: 'success', data: result });
    }


    static create = function (req, res) {
        const errors = validationResult(req);

        let  {first_name, last_name, user_name, email,data_of_birthday, created_at} = req.body; 
        let sql = `INSERT INTO members (first_name, last_name, user_name, email, date_of_birthday, created_at) 
                    VALUES ('${first_name}','${last_name}','${user_name}','${email}','${data_of_birthday}','${created_at}')`;

        db.query(sql, function (error, results, fields) {
            if (error) throw error;


        })

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        return res.status(201).json({ message: 'success' });
    }

    static update = function (req, res) {
    //     let  {created_at} = req.body; 
    // let {id} = req.params;
    // let sql = `UPDATE members SET created_at='${created_at}' WHERE id=${id}`;
   
    // db.query(sql, (err, result) => {
    //     if(err) throw err;
    //     res.status(200).send(req.body);
    // })
    }

    // Delete user by :id
    static destroy = function (req, res) {
      let {id} = req.params;
      let sql = `DELETE FROM members WHERE id=${id}`;

    db.query(sql, (err, result) => {
         if (err) throw err;
         res.send(req.body);
    })
    }
}

module.exports = { Members }