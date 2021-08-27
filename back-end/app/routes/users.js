const express = require('express');
const router = express.Router();
const mysql = require('../mysql.js').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = require('../../middleware/login.js');

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
        
                conn.query(`INSERT INTO users (login, pass, name) VALUES (?, ?, ?)`,
                [req.body.login, hash, req.body.user_name],
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
                return res.status(500).send({error: 'Authentication failed.'})
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

router.post('/login/verify', login.authorizationRequire, (req, res, next) => {
    const response = {
        msg: 'Login Verified',
    }

    return res.status(200).send(response);
});

router.post('/login/check', login.authorizationRequire, (req, res, next) => {
    mysql.getConnection( (err, conn) => {
        const query =   `SELECT users.login, users.name, COUNT(aumigos.owner_id) as amount FROM users ` +
                        `INNER JOIN aumigos ON users.id_user = aumigos.owner_id ` +
                        `WHERE aumigos.owner_id = ?;`;
        conn.query(query, [req.user.id_user], (error, results, fields) => {
            conn.release();

            if (error) {
                return res.status(401).send({error: 'Authentication failed.'})
            }

            const response = {
                user_name: results[0].name,
                user: results[0].login,
                dogs_posted: results[0].amount
            }

            if (results != 0) {
                return res.status(200).send(response);
            }

            return res.status(401).send({error: 'Authentication failed.'})
        });
    });
});


module.exports = router;