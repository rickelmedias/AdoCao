const express = require('express');
const router = express.Router();
const mysql = require('../mysql.js').pool;

// ==| Returning all 'Aumigos' |==

router.get('/', (req, res, next) => {
    mysql.getConnection(function (error, conn) {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM adocao_db.breed;',
            function (error, results, fields) {
                conn.release();
                
                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(200).send({
                    response: results
                });
            }
        )
    });
});


// INSERT BREED
router.post('/', (req, res, next) => {
    const Req = {
        breed: req.body.breed.trimStart().trimEnd()
    }

    mysql.getConnection(function (error, conn) {
        if (error) { return res.status(500).send({ error: error }) }

        DataTime_created = new Date().toLocaleString()
        console.log(Req.breed);

        conn.query('INSERT INTO adocao_db.breed (breed, created_at) VALUE (?, ?);',
            [Req.breed, DataTime_created], function (error, results, fields) {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }

                res.status(201).send({
                    msg: 'Breed has been created',
                    id_breed: results.insertId,
                    breed_created: Req.breed,
                    created_at: DataTime_created
                })

            });
    });

});


// ==| Returning determinated 'Aumigo' |==

router.get('/:id_aumigos', (req, res, next) => {
    const id = req.params.id_aumigos

    mysql.getConnection(function (error, conn) {
        if (error) { return res.status(500).send({error: error})}

        conn.query(
                    'SELECT * FROM adocao_db.breed WHERE id_breed = ?;',
                    [id],
                    function (error, results, fields) {
                        conn.release();

                        if (error) {
                            return res.status(500).send({
                                error: error,
                                response: null
                            });
                        }

                        res.status(200).send({
                            response: results
                        })
                    }
        )
    });
});


router.patch('/', (req, res, next) => {
    res.status(201).send({
        return: 'PATCH aumigos'
    })
});

router.delete('/', (req, res, next) => {
    res.status(201).send({
        return: 'DELETE aumigos'
    })
});


module.exports = router;