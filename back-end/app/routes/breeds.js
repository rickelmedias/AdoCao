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

                return res.status(200).send(response);
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

        conn.query('INSERT INTO adocao_db.breed (breed, created_at, updated_at) VALUE (?, ?, ?);',
            [Req.breed, DataTime_created, DataTime_created], function (error, results, field) {
                conn.release();

                if (error) {
                    return res.status(500).send({
                        error: error,
                        response: null
                    })
                }

                const response = {
                    msg: 'Breed has been created',
                    breed_created: {
                        id_breed: results.insertId,
                        name_breed: Req.breed,
                        created_at: DataTime_created,
                        updated_at: DataTime_created
                    },
                    request: {
                        method: "POST",
                        description: "ADD A BREED",
                        url: "http://localhost:3003/breeds"
                    }
                }

                return res.status(201).send(response);

            });
    });

});

// SELECT BREED BY ID
router.get('/:id_breeds', (req, res, next) => {
    const id = req.params.id_breeds

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

                if (results.length == 0) {
                    return res.status(404).send({
                        msg: 'ID not found.'
                    })
                } 

                const response = {
                    id_breed: id,
                    name_breed: results[0].breed,
                    created_at: results[0].created_at,
                    updated_at: results[0].updated_at,
                    request: {
                        method: "GET",
                        description: "SHOW SPECIFY BREED DETAILS",
                        url: "http://localhost:3003/breeds/" + id
                    }
                }

                res.status(200).send(response);
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

                const response = {
                    msg: 'Breed has been updated',
                    breed_updated: {
                        id_breed: Req.id_breed,
                        name_breed: Req.breed,
                        updated_at: Req.updated_at
                    },
                    request: {
                        method: "GET",
                        description: "SHOW UPDATED DETAILS OF BREED",
                        url: "http://localhost:3003/breeds/" + Req.id_breed
                    }
                }

                res.status(202).send(response);
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
                
                const response = {
                    msg: 'Breed has been deleted',
                    request: {
                        method: "POST",
                        description: "ADD A NEW BREED",
                        url: "http://localhost:3003/breeds",
                        body: {
                                breed: "String"
                        }
                    }
                }

                res.status(202).send(response);
            }

        )

    });
});


module.exports = router;