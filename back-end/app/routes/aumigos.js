const express   = require('express');
const router    = express.Router();

// ==| Returning all 'Aumigos' |==

router.get('/', (req, res, next) => {
    res.status(200).send({
        return: 'GET aumigos'
    })
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        return: 'POST aumigos'
    })
});


// ==| Returning determinated 'Aumigo' |==

router.get('/:id_aumigos', (req, res, next) =>{
    const id = req.params.id_aumigos

    res.status(200).send({
        return: 'GET determinated aumigo by id',
        id: id
    })
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