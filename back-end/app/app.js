const routeAumigos = require('./routes/aumigos.js');

const express   = require('express');
const app       = express();

const morgan    = require('morgan');

// Pages:

app.use(morgan('dev'));
app.use('/aumigos', routeAumigos);

// Page not found:

app.use((req, res, next) => {
    const error = new Error ('Error 404 Not Found');
    error.status = 404;
    next(error);
});

app.use( (error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            return: error.message
        }
    })
})

module.exports = app;