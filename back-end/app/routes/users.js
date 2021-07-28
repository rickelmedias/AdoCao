const express = require('express');
const router = express.Router();
const mysql = require('../mysql.js').pool;
const bcrypt = require('bcrypt');

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

module.exports = router;