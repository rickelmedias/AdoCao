const express = require('express');
const router = express.Router();
const mysql = require('../mysql.js').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const JWT = {
    token: process.env.JWT_TOKEN
};

// Register:

router.post('/register', (req, res, next) => {
    mysql.getConnection( (error, conn) => {
        if (error) { return res.status(500).send({error: error}) }
        bcrypt.hash(req.body.pass,  10,  (errBcrypt, hash) => {
                if (errBcrypt) { return res.status(500).send({error: errBcrypt}) }
        
                conn.query(`INSERT INTO users (login, pass) VALUES (?, ?)`,
                [req.body.login, hash],
                (error, results) => {
                    conn.release();
                    if ( error ) { 
                        if (error.code === "ER_DUP_ENTRY") {
                            const response = {
                                error: "User alerady exists"
                            }
                            return res.status(409).send({response});
                        }else{
                            return res.status(500).send({error: error});
                        }                 
                    } else {
                    
                        const response = { 
                            msg: 'User has been created'
                        }
                    
                        return res.status(201).send(response);
                    }
                });
        });

    });
});


// Login:

router.post('/login', (req, res, next) => {
    mysql.getConnection( (error, conn) => {
        if (error) { return res.status(500).send({error: error})}

        const query = `SELECT * FROM users WHERE login = ?`;
        conn.query(query, [req.body.login], (error, results, fields) => {
            conn.release();

            if (error) {
                return res.status(500).send({error: error})
            }
            if (results.length < 1) {
                return res.status(401).send({ error: 'Authentication failed.'})
            }

            bcrypt.compare(req.body.pass, results[0].pass, (error, result) => {
                if (error) {
                    return res.status(401).send({ error: 'Authentication failed.'})
                }

                if (result) {
                    let token = jwt.sign({
                        id_user: results[0].id_user,
                        login: results[0].login
                    }, JWT.token,
                    {
                        expiresIn: "1h",
                    });
                    return res.status(200).send({ 
                        msg: 'Sucess',
                        id: results[0].id_user,
                        token: token
                    });
                }

                return res.status(401).send({ error: 'Authentication failed.'});
            });
        });
    });
});

module.exports = router;