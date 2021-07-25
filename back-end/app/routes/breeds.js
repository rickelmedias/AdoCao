const express = require('express');
const router = express.Router();
const mysql = require('../mysql.js').pool;

// SELECT ALL BREED
router.get('/', (req, res, next) => {
    mysql.getConnection(function (error, conn) {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM adocao_db.breed;',
            function (error, results, field) {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                const response = {
                    amount: results.length,
                    breed: results.map(breeds => {
                        return {
                            id_breed: breeds.id_breed,
                            breed: breeds.breed,
                            created_at: breeds.created_at,
                            updated_at: breeds.updated_at,
                            request: {
                                method: 'GET',
                                description: '',
                                url: 'http://localhost:3003/breeds/' + breeds.id_breed
                            }
                        }
                    })
                }

                res.status(200).send({
                    response: response
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

        const DataTime_created = new Date().toLocaleString();

        conn.query('INSERT INTO adocao_db.breed (breed, created_at) VALUE (?, ?);',
            [Req.breed, DataTime_created], function (error, results, field) {
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


// SELECT BREED BY ID
router.get('/:id_aumigos', (req, res, next) => {
    const id = req.params.id_aumigos

    mysql.getConnection(function (error, conn) {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(
            'SELECT * FROM adocao_db.breed WHERE id_breed = ?;',
            [id],
            function (error, results, field) {
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

// UPDATE BREED
router.patch('/', (req, res, next) => {
    const Req = {
        id_breed: req.body.id_breed,
        breed: req.body.breed.trimStart().trimEnd(),
        updated_at: new Date().toLocaleString()
    }

    const queryUpdate =
        `UPDATE adocao_db.breed ` +
        `SET breed = '${Req.breed}', ` +
        `updated_at = '${Req.updated_at}' ` +
        `WHERE id_breed = ${Req.id_breed};`;


    mysql.getConnection(function (error, conn) {
        if (error) { return res.status(500).send({ error: error }); }

        conn.query(queryUpdate,

            function (error, results, field) {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(202).send({
                    msg: 'Breed has been updated',
                    id_breed: results.insertId,
                    breed_udpated: Req.breed,
                    updated_at: Req.updated_at
                });
            }
        )
    })
});

// DELETE BREED
router.delete('/', (req, res, next) => {
    const Req = {
        id_breed: req.body.id_breed
    };

    const queryDelete =
        `DELETE FROM adocao_db.breed ` +
        `WHERE id_breed = ${Req.id_breed};`;

    mysql.getConnection(function (error, conn) {
        if (error) { return res.status(500).send({ error: error }) }

        conn.query(queryDelete,
            function (error, results, field) {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }

                res.status(202).send({
                    msg: 'Breed has been deleted'
                });
            }

        )

    });
});


module.exports = router;